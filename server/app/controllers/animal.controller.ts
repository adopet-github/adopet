import { Request, Response } from 'express';
import { MyRequest, MyResponse } from '../types/server';
import constants from '../utils/constants';
import { animalSanitize, imageSanitize } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import { Model } from 'sequelize';
import { Image as ImageType } from '../types/models';
import includes from '../utils/includes';
import { notFoundChecker } from '../utils/db';
import { AdopterFromDb, AnimalFromDb } from '../types/dboutputs';
import dataParser from '../utils/dataparser';
import { v4 as uuidv4 } from 'uuid';
import { decryptToken } from '../utils/jwt';
import { getDistance } from 'geolib';

const { General, Animal, Image, Shelter, Adopter, Adopter_Animal } = models;

const controller = {
  retrieveAll: async (req: MyRequest, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    try {
      if (req.query.distance === undefined) {
        const modelResponse = await Animal.findAll({
          include: includes.animal
        });

        response.data = (modelResponse as unknown as AnimalFromDb[]).map(
          dataParser.animal
        );
      } else {
        const shelters = await Shelter.findAll({
          include: [
            {
              association: relationships.shelter.animals,
              include: includes.animal
            },
            {
              association: relationships.shelter.user,
              include: [relationships.user.location]
            }
          ]
        });
        const decryptedToken = decryptToken(req.token as string) as unknown as {
          id: string;
        };
        const adopter = await Adopter.findByPk(decryptedToken.id, {
          include: includes.adopter
        });
        const unparsedAnimals = [];
        const adopterLocation = (
          adopter as unknown as {
            user: { location: { latitude: number; longitude: number } };
          }
        ).user.location;
        for (const shelter of shelters) {
          const shelterLocation = (
            shelter as unknown as {
              user: { location: { latitude: number; longitude: number } };
            }
          ).user.location;
          const distance = getDistance(
            {
              latitude: adopterLocation.latitude,
              longitude: adopterLocation.longitude
            },
            {
              latitude: shelterLocation.latitude,
              longitude: shelterLocation.longitude
            },
            100
          );
          if (distance / 1000 <= Number(req.query.distance)) {
            unparsedAnimals.push(
              ...(
                shelter as unknown as { animals: AnimalFromDb[] }
              ).animals.map((animal) => ({
                ...animal,
                distance: distance / 1000
              }))
            );
          }
        }
        response.data = (unparsedAnimals as unknown as AnimalFromDb[]).map(
          dataParser.animal
        );
      }
      response.status = constants.statusCodes.ok;
      response.message = 'Animals retrieved successfully!';
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

      notFoundChecker(animal, id, response, 'Animal');

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

      notFoundChecker(
        shelter,
        safeBody.shelterId as string,
        response,
        'Shelter'
      );

      const animal = await General.create(
        {
          id: uuidv4(),
          description: safeBody.description,
          animal: {
            id: uuidv4(),
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

      notFoundChecker(animal, id, response, 'Animal');

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
      response.data = dataParser.animal(
        updatedAnimal as unknown as AnimalFromDb
      );
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
      notFoundChecker(animal, id, response, 'Animal');

      const generalId = (animal as unknown as { generalId: number }).generalId;

      await Animal.destroy({ where: { id }, transaction });
      await General.destroy({ where: { id: generalId }, transaction });

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

      notFoundChecker(animal, id, response, 'Animal');

      const { images } = req.body;
      const mappedImages = images.map((image: ImageType) => ({
        ...sanitizeCreate(image),
        id: uuidv4(),
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
      notFoundChecker(animal, animalId, response, 'Animal');

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, adopterId, response, 'Adopter');

      const relationship = await Adopter_Animal.findOne({
        where: {
          adopterId,
          animalId,
          is_liked: true
        }
      });

      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} does not like animal with id ${animalId}`;
        throw new Error(response.message);
      }

      await Adopter_Animal.update(
        {
          is_liked: false,
          is_matched: true
        },
        {
          where: { adopterId, animalId }
        }
      );

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
      notFoundChecker(animal, animalId, response, 'Animal');

      const adopter = await Adopter.findByPk(adopterId);
      notFoundChecker(adopter, adopterId, response, 'Adopter');

      const relationship = await Adopter_Animal.findOne({
        where: {
          adopterId,
          animalId,
          is_liked: true
        }
      });

      if (relationship === null) {
        response.status = constants.statusCodes.notFound;
        response.message = `The adopter with id ${adopterId} does not like animal with id ${animalId}`;
        throw new Error(response.message);
      }

      await Adopter_Animal.update(
        {
          is_liked: false,
          is_matched: false
        },
        {
          where: { adopterId, animalId }
        }
      );

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter disliked successfully!';
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-likeAdopter: ', err);
    }

    res.status(response.status).send(response);
  },

  getLikes: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id, {
        include: [
          {
            association: relationships.animal.adopters,
            through: {
              where: { is_liked: true }
            },
            include: [
              {
                association: relationships.adopter.user,
                include: [
                  {
                    association: relationships.user.general,
                    include: [relationships.general.images]
                  },
                  relationships.user.location
                ]
              }
            ]
          }
        ]
      });

      const likes = (
        animal as unknown as { adopters: AdopterFromDb[] }
      ).adopters.map(dataParser.animalLike);

      response.status = constants.statusCodes.ok;
      response.message =
        'Likes retrieved successfully for ' +
        (animal as unknown as { name: string }).name +
        '!';
      response.data = likes;
    } catch (err) {
      console.warn('ERROR AT ANIMAL-CONTROLLER-getLikes: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
