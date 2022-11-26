import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import { animalSanitize, imageSanitize } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import { Model } from 'sequelize';
import { Image as ImageType } from '../types/models';

const { General, Animal, Image } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const modelResponse = await Animal.findAll();

      response.status = constants.statusCodes.ok;
      response.message = 'Animals retrieved successfully!';
      response.data = modelResponse;
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-retrieveAll: ', err);
    }

    res.status(response.status).send(response);
  },

  retrieveOne: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id, {
        include: [
          {
            association: relationships.animal.general,
            include: [relationships.general.images]
          },
          relationships.animal.shelter
        ]
      });

      if (animal === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${id} not found.`;
        throw new Error(response.message);
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Animal retrieved successfully!';
      response.data = animal;
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-retrieveOne: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeCreate } = animalSanitize;

    const unsafeBody = req.body;

    const safeBody = sanitizeCreate(unsafeBody);

    const transaction = await sequelize.transaction();
    try {
      const animal = await General.create(
        {
          description: safeBody.description,
          animal: {
            name: safeBody.name,
            age: safeBody.age,
            weight: safeBody.weight,
            shelterId: safeBody.shelterId
          }
        },
        {
          include: [
            {
              association: relationships.general.animal,
              include: [relationships.animal.shelter]
            }
          ],
          transaction
        }
      );
      await transaction.commit();
      response.status = constants.statusCodes.created;
      response.message = 'Animal created succesfully!';
      response.data = animal;
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ANIMAL-CONTROLLER-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeUpdate } = animalSanitize;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      const unsafeBody = req.body;

      const safeBody = sanitizeUpdate(unsafeBody);

      const animal = await Animal.findByPk(id, {
        include: [relationships.animal.general]
      });

      if (animal === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${id} not found.`;
        throw new Error(response.message);
      }

      const general = await General.findByPk(
        (animal as unknown as { general: { id: number } }).general.id
      );

      await animal.update(
        {
          name: safeBody.name,
          age: safeBody.age,
          weight: safeBody.weight
        } || {},
        {
          transaction
        }
      );

      await (general as Model).update(
        {
          description: safeBody.description
        } || {},
        {
          transaction
        }
      );

      const updatedAnimal = await Animal.findByPk(id, {
        transaction,
        include: [relationships.animal.general]
      });

      await transaction.commit();
      response.status = constants.statusCodes.ok;
      response.message = 'Animal updated succesfully!';
      response.data = updatedAnimal;
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ANIMAL-CONTROLLER-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;

      const rowsDeleted = await Animal.destroy({ where: { id } });

      if (rowsDeleted === 0) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${id} not found.`;
        throw new Error(response.message);
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Animal deleted succesfully!';
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  },
  addManyImages: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const { sanitizeCreate } = imageSanitize;

    try {
      const { id } = req.params;

      const animal = await Animal.findByPk(id, {
        include: [relationships.animal.general]
      });

      if (animal === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `Animal with id ${id} not found.`;
        throw new Error(response.message);
      }

      const { images } = req.body;
      console.log(images);
      const mappedImages = images.map((image: ImageType) => ({
        ...sanitizeCreate(image),
        generalId: (animal as unknown as { general: { id: number } }).general.id
      }));
      console.log(mappedImages);
      const createdImages = await Image.bulkCreate(mappedImages);
      response.status = constants.statusCodes.ok;
      response.message = 'Images added to animal succesfully!';
      response.data = createdImages;
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-addManyImages: ', err);
    }
    res.status(response.status).send(response);
  }
};

export default controller;
