import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import { animalSanitize, imageSanitize } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import { Model } from 'sequelize';
import { Image as ImageType } from '../types/models';
import includes from '../utils/includes';
import { notFoundChecker } from '../utils/db';
import { AnimalFromDb } from '../types/dboutputs';
import dataParser from '../utils/dataparser';

const { General, Animal, Image, Shelter, Adopter, Adopter_Animal } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const modelResponse = await Animal.findAll({include: includes.animal});

      response.status = constants.statusCodes.ok;
      response.message = 'Animals retrieved successfully!';
      response.data = (modelResponse as unknown as AnimalFromDb[]).map(dataParser.animal);
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
        include: includes.animal
      });

      notFoundChecker(animal, Number(id), response, 'Animal');

      response.status = constants.statusCodes.ok;
      response.message = 'Animal retrieved successfully!';
      response.data = dataParser.animal(animal as unknown as AnimalFromDb);
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
      const shelter = await Shelter.findByPk(safeBody.shelterId);

      notFoundChecker(shelter, safeBody.shelterId, response, 'Shelter');

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

      notFoundChecker(animal, Number(id), response, 'Animal');

      const general = await General.findByPk(
        (animal as unknown as { general: { id: number } }).general.id
      );

      await (animal as Model).update(
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
        include: includes.animal
      });

      await transaction.commit();
      response.status = constants.statusCodes.ok;
      response.message = 'Animal updated succesfully!';
      response.data = dataParser.animal(updatedAnimal as unknown as AnimalFromDb);
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ANIMAL-CONTROLLER-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);
      notFoundChecker(animal, Number(id), response, 'Animal');
      
      const generalId = (animal as unknown as {generalId: number}).generalId;
      
      await Animal.destroy({ where: { id }, transaction });
      await General.destroy({ where: { id: generalId }, transaction});

      await transaction.commit();

      response.status = constants.statusCodes.ok;
      response.message = 'Animal deleted succesfully!';
    } catch (err) {
      await transaction.rollback();
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

      notFoundChecker(animal, Number(id), response, 'Animal');

      const { images } = req.body;
      console.log(images);
      const mappedImages = images.map((image: ImageType) => ({
        ...sanitizeCreate(image),
        generalId: (animal as unknown as { general: { id: number } }).general.id
      }));
      const createdImages = await Image.bulkCreate(mappedImages);
      response.status = constants.statusCodes.ok;
      response.message = 'Images added to animal succesfully!';
      response.data = createdImages;
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-addManyImages: ', err);
    }
    res.status(response.status).send(response);
  },

  matchAdopter: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { adopterId, animalId } = req.params;

      const animal = await Animal.findByPk(animalId);
      notFoundChecker(animal, Number(animalId), response, 'Animal');

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, Number(adopterId), response, 'Adopter');


      const relationship = await Adopter_Animal.findOne(
        {where: {
          adopterId,
          animalId,
          is_liked: true
        }}
      );

      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} does not like animal with id ${animalId}`;
        throw new Error(response.message);
      }

      await Adopter_Animal.update({
        is_liked: false,
        is_matched: true
      }, {
        where: {adopterId, animalId}
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter matched successfully!';

    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-matchAdopter: ', err);
    }

    res.status(response.status).send(response);
  },

  dislikeAdopter: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { adopterId, animalId } = req.params;

      const animal = await Animal.findByPk(animalId);
      notFoundChecker(animal, Number(animalId), response, 'Animal');

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, Number(adopterId), response, 'Adopter');

      const relationship = await Adopter_Animal.findOne(
        {where: {
          adopterId,
          animalId,
          is_liked: true
        }}
      );

      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} does not like animal with id ${animalId}`;
        throw new Error(response.message);
      }

      await Adopter_Animal.update({
        is_liked: false,
        is_matched: false
      }, {
        where: {adopterId, animalId}
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter disliked successfully!';

    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-likeAdopter: ', err);
    }

    res.status(response.status).send(response);
  },
};

export default controller;
