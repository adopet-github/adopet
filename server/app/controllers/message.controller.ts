import { Request, Response } from 'express';
import models from '../models';
import constants from '../utils/constants';
import { MyResponse } from '../types/server';
import { notFoundChecker } from '../utils/db';
import io from '../app';

const { Message, Adopter, Animal, Adopter_Animal } = models;

const controller = {
  retrieveByMatch: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { adopterId, animalId } = req.params;

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, adopterId, response, 'Adopter');

      const animal = await Animal.findByPk(animalId);
      notFoundChecker(animal, animalId, response, 'Animal');

      const relationship = await Adopter_Animal.findOne({
        where: {
          adopterId,
          animalId,
          is_matched: true
        }
      });
      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} is not matched with animal with id ${animalId}`;
        throw new Error(response.message);
      }

      const messages = await Message.findAll({
        where: { adopterId, animalId }
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Messages retrieved successfully!';
      response.data = messages;
    } catch (err) {
      console.warn('ERROR AT MESSAGE-CONTROLLER-retrieveByMatch: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { adopterId, animalId } = req.params;
      const { author, content } = req.body;

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, adopterId, response, 'Adopter');

      const animal = await Animal.findByPk(animalId);
      notFoundChecker(animal, animalId, response, 'Animal');

      const relationship = await Adopter_Animal.findOne({
        where: {
          adopterId,
          animalId,
          is_matched: true
        }
      });
      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} is not matched with animal with id ${animalId}`;
        throw new Error(response.message);
      }

      const message = await Message.create({
        adopterId,
        animalId,
        author,
        content
      });

      response.status = constants.statusCodes.created;
      response.message = 'Message created successfully!';
      io.emit('message', message);
      response.data = message;
    } catch (err) {
      console.warn('ERROR AT MESSAGE-CONTROLLER-create: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
