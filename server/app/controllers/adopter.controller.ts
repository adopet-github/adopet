import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import {
  sanitizeAdopterCreate,
  sanitizeAdopterUpdate
} from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import {
  generateAdopterUpdateBody,
  getAdopterFromSafeBody,
  getUserFromSafeBody
} from '../utils/db';
import { Model } from 'sequelize';

const { General, Adopter, User } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const modelResponse = await Adopter.findAll();

      response.status = constants.statusCodes.ok;
      response.message = 'Adopters retrieved successfully!';
      response.data = modelResponse;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-retrieveAll: ', err);
    }

    res.status(response.status).send(response);
  },

  retrieveOne: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;
      const adopter = await Adopter.findByPk(id, {
        include: [
          {
            association: relationships.adopter.user,
            include: [relationships.user.general]
          },
          {
            association: relationships.adopter.animals
          }
        ]
      });

      if (adopter === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Adopter with id ${id} not found.`;
        throw new Error(response.message);
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter retrieved successfully!';
      response.data = adopter;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-retrieveOne: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const unsafeBody = req.body;

    const safeBody = sanitizeAdopterCreate(unsafeBody);

    const transaction = await sequelize.transaction();
    try {
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
  },

  update: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      const unsafeBody = req.body;

      const safeBody = sanitizeAdopterUpdate(unsafeBody);

      const adopter = await Adopter.findByPk(id, {
        include: [
          {
            association: relationships.adopter.user,
            include: [relationships.user.general]
          },
          {
            association: relationships.adopter.animals
          }
        ]
      });

      if (adopter === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Adopter with id ${id} not found.`;
        throw new Error(response.message);
      }

      const user = await User.findByPk(
        (adopter as unknown as { user: { id: number } }).user.id
      );
      const general = await General.findByPk(
        (user as unknown as { generalId: number }).generalId
      );

      await adopter.update(getAdopterFromSafeBody(safeBody) || {}, {
        transaction
      });

      await (user as Model).update(
        getUserFromSafeBody(safeBody) || {},
        {
          transaction
        }
      );

      await (general as Model).update(
        generateAdopterUpdateBody(safeBody) || {},
        {
          transaction
        }
      );

      const updatedAdopter = await Adopter.findByPk(id, {
        transaction,
        include: [
          {
            association: relationships.adopter.user,
            include: [relationships.user.general]
          },
          {
            association: relationships.adopter.animals
          }
        ]
      });

      await transaction.commit();
      response.status = constants.statusCodes.ok;
      response.message = 'Adopter updated succesfully!';
      response.data = updatedAdopter;
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ADOPTER-CONTROLLER-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = {...constants.fallbackResponse} as MyResponse;

    try {
      const { id } = req.params;

      const rowsDeleted = await Adopter.destroy({where: {id}});

      if (rowsDeleted === 0) {
        response.status = constants.statusCodes.notFound;
        response.message = `Adopter with id ${id} not found.`;
        throw new Error(response.message);
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter deleted succesfully!';
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-delete: ', err);
    };

    res.status(response.status).send(response);
  }
};

export default controller;
