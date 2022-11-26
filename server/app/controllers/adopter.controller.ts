import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import { sanitizeAdopter } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';

const { General, Adopter, User } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = constants.fallbackResponse as MyResponse;

    try {
      const modelResponse = await Adopter.findAll();

      response.status = constants.statusCodes.ok;
      response.message = 'Tests retrieved successfully!';
      response.data = modelResponse;
    } catch (err) {
      console.warn('ERROR AT TEST-CONTROLLER-retrieveAll: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = constants.fallbackResponse as MyResponse;

    const unsafeBody = req.body;

    const safeBody = sanitizeAdopter(unsafeBody);

    const transaction = await sequelize.transaction();
    try {
      //TODO: FIRST MAKE ADOPTER PASS ID TO NEW USER AND PASS NEW USER ID TO GENERAL
      const adopter = await General.create(
        {
          description: safeBody.description,
          user: {
            email: safeBody.email,
            password: safeBody.password,
            phone_number: safeBody.phone_number,
            adopter: {
              first_name: safeBody.first_name,
              last_name: safeBody.last_name,
              age: safeBody.age,
              house_type: safeBody.house_type,
              has_pets: safeBody.has_pets,
              has_children: safeBody.has_children,
              time_at_home: safeBody.time_at_home
            }
          }
        },
        {
          include: [
            {
              association: relationships.general.user,
              include: [relationships.user.adopter]
            }
          ],
          transaction
        }
      );
      await transaction.commit();
      response.status = constants.statusCodes.created;
      response.message = 'Adopter created succesfully!';
      response.data = adopter;
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ADOPTER-CONTROLLER-create: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
