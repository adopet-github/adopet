import { Request, Response } from "express";
import models from "../models";
import constants from '../utils/constants';
import { MyResponse } from "../types/server";

const { Message, Adopter, Animal, Adopter_Animal } = models;

const controller = {
  retrieveByMatch: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { adopterId, animalId } = req.params;

      const adopter = await Adopter.findByPk(adopterId);
      if (adopter === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Adopter with id ${adopterId} not found.`;
        throw new Error(response.message);
      }

      const animal = await Animal.findByPk(animalId);
      if (animal === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${animalId} not found.`;
        throw new Error(response.message);
      }

      const relationship = await Adopter_Animal.findOne(
        {where: {
          adopterId,
          animalId,
          is_matched: true
        }}
      );
      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} is not matched with animal with id ${animalId}`;
        throw new Error(response.message);
      }

      const messages = await Message.findAll({
        where: {adopterId, animalId}
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
      if (adopter === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Adopter with id ${adopterId} not found.`;
        throw new Error(response.message);
      }

      const animal = await Animal.findByPk(animalId);
      if (animal === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${animalId} not found.`;
        throw new Error(response.message);
      }

      const relationship = await Adopter_Animal.findOne(
        {where: {
          adopterId,
          animalId,
          is_matched: true
        }}
      );
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
      response.data = message;

    } catch (err) {
      console.warn('ERROR AT MESSAGE-CONTROLLER-create: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;