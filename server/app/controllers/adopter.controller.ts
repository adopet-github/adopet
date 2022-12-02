import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import { adopterSanitize, imageSanitize } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import { Model } from 'sequelize';
import Location from '../models/location.model';
import { Image as ImageType } from '../types/models';
import { notFoundChecker } from '../utils/db';
import includes from '../utils/includes';
import dataParser from '../utils/dataparser';
import { AdopterFromDb, AnimalFromDb } from '../types/dboutputs';
import { generateToken } from '../utils/jwt';
import { genPasswordAndSalt } from '../utils/password';
import { v4 as uuidv4 } from 'uuid';

const { General, Adopter, User, Image, Animal, Adopter_Animal, Token } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const modelResponse = await Adopter.findAll({
        include: includes.adopter
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Adopters retrieved successfully!';
      response.data = (modelResponse as unknown as AdopterFromDb[]).map(
        dataParser.adopter
      );
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
        include: includes.adopter
      });

      notFoundChecker(adopter, id, response, 'Adopter');

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter retrieved successfully!';
      response.data = dataParser.adopter(adopter as unknown as AdopterFromDb);
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-retrieveOne: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeCreate } = adopterSanitize;

    const unsafeBody = req.body;

    const safeBody = sanitizeCreate(unsafeBody);

    const adopterPassword = safeBody.password;
    if (adopterPassword) {
      const passSaltObj = await genPasswordAndSalt(adopterPassword as string);
      safeBody.password = passSaltObj.password;
      safeBody.salt = passSaltObj.salt;
    }
    const transaction = await sequelize.transaction();
    try {
      const adopter = await General.create(
        {
          id: uuidv4(),
          description: safeBody.description,
          user: {
            id: uuidv4(),
            email: safeBody.email,
            password: safeBody.password || null,
            salt: safeBody.salt || null,
            adopter: {
              id: uuidv4(),
              first_name: safeBody.first_name,
              last_name: safeBody.last_name,
              age: safeBody.age,
              house_type: safeBody.house_type,
              has_pets: safeBody.has_pets,
              has_children: safeBody.has_children,
              time_at_home: safeBody.time_at_home,
              google_id: safeBody.google_id || null
            },
            location: {
              id: uuidv4(),
              latitude: safeBody.latitude,
              longitude: safeBody.longitude,
              address: safeBody.address
            }
          }
        },
        {
          include: [
            {
              association: relationships.general.user,
              include: [relationships.user.adopter, relationships.user.location]
            }
          ],
          transaction
        }
      );

      const responseToken = await Token.create({
        id: uuidv4(),
        content: generateToken({
          id: (adopter as unknown as { user: { adopter: { id: string } } }).user
            .adopter.id,
          type: 'adopter'
        })
      });
      response.token = (
        responseToken as unknown as { content: string }
      ).content;

      await transaction.commit();
      response.status = constants.statusCodes.created;
      response.data = (
        adopter as unknown as { user: { adopter: { id: string } } }
      ).user.adopter.id;
      response.message = 'Adopter created succesfully!';
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ADOPTER-CONTROLLER-create: ', err);
    }
    res.status(response.status).send(response);
  },

  update: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeUpdate } = adopterSanitize;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      const unsafeBody = req.body;

      const safeBody = sanitizeUpdate(unsafeBody);

      
      
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
      
      notFoundChecker(adopter, id, response, 'Adopter');
      
      const adopterPassword = safeBody.password;
      if (adopterPassword) {
        const passSaltObj = await genPasswordAndSalt(adopterPassword as string);
        safeBody.password = passSaltObj.password;
        safeBody.salt = passSaltObj.salt;
      }
      
      const user = await User.findByPk(
        (adopter as unknown as { user: { id: number } }).user.id,
        {
          include: [relationships.user.location]
        }
      );
      const general = await General.findByPk(
        (user as unknown as { generalId: number }).generalId
      );

      const location = await Location.findByPk(
        (user as unknown as { location: { id: number } }).location.id
      );

      await (adopter as Model).update(
        {
          first_name: safeBody.first_name,
          last_name: safeBody.last_name,
          age: safeBody.age,
          house_type: safeBody.house_type,
          has_pets: safeBody.has_pets,
          has_children: safeBody.has_children,
          time_at_home: safeBody.time_at_home
        } || {},
        {
          transaction
        }
      );

      await (user as Model).update(
        {
          email: safeBody.email,
          password: safeBody.password
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

      await (location as Model).update(
        {
          latitude: safeBody.latitude,
          longitude: safeBody.longitude,
          address: safeBody.address
        } || {},
        {
          transaction
        }
      );

      const updatedAdopter = await Adopter.findByPk(id, {
        transaction,
        include: includes.adopter
      });

      await transaction.commit();
      response.status = constants.statusCodes.ok;
      response.message = 'Adopter updated succesfully!';
      response.data = dataParser.adopter(
        updatedAdopter as unknown as AdopterFromDb
      );
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ADOPTER-CONTROLLER-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;

      const adopter = await Adopter.findByPk(id, {
        include: [relationships.adopter.user],
        transaction
      });

      notFoundChecker(adopter, id, response, 'Adopter');
      const userId = (adopter as unknown as { user: { id: number } }).user.id;
      const generalId = (adopter as unknown as { user: { generalId: number } })
        .user.generalId;

      await Adopter.destroy({ where: { id }, transaction });
      await User.destroy({ where: { id: userId }, transaction });
      await General.destroy({ where: { id: generalId }, transaction });

      await transaction.commit();

      response.status = constants.statusCodes.ok;
      response.message = 'Adopter deleted succesfully!';
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT ADOPTER-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  },
  addManyImages: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const { sanitizeCreate } = imageSanitize;

    try {
      const { id } = req.params;

      const adopter = await Adopter.findByPk(id, {
        include: [
          {
            association: relationships.adopter.user,
            include: [relationships.user.general]
          }
        ]
      });

      notFoundChecker(adopter, id, response, 'Adopter');

      const { images } = req.body;
      const mappedImages = images.map((image: ImageType) => ({
        ...sanitizeCreate(image),
        id: uuidv4(),
        generalId: (adopter as unknown as { user: { generalId: number } }).user
          .generalId
      }));
      const createdImages = await Image.bulkCreate(mappedImages);
      response.status = constants.statusCodes.ok;
      response.message = 'Images added to adopter succesfully!';
      response.data = createdImages;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-addManyImages: ', err);
    }
    res.status(response.status).send(response);
  },

  likeAnimal: async (req: Request, res: Response) => {
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
          animalId
        }
      });

      if (relationship !== null) {
        response.status = constants.statusCodes.badRequest;
        response.message = `The adopter with id ${adopterId} already likes or dislikes animal with id ${animalId}`;
        throw new Error(response.message);
      }

      const like = await Adopter_Animal.create({
        adopterId,
        animalId,
        is_liked: true,
        is_matched: false
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Animal liked successfully!';
      response.data = like;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-likeAnimal: ', err);
    }

    res.status(response.status).send(response);
  },

  dislikeAnimal: async (req: Request, res: Response) => {
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
          animalId
        }
      });

      if (relationship !== null) {
        response.status = constants.statusCodes.badRequest;
        response.message = `The adopter with id ${adopterId} already likes or dislikes animal with id ${animalId}`;
        throw new Error(response.message);
      }

      const dislike = await Adopter_Animal.create({
        adopterId,
        animalId,
        is_liked: false,
        is_matched: false
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Animal disliked successfully!';
      response.data = dislike;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-likeAnimal: ', err);
    }

    res.status(response.status).send(response);
  },

  getMatches: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const nonParsedMatches = await Adopter.findByPk(req.params.id, {
        include: [
          {
            association: relationships.adopter.animals,
            through: {
              where: {
                is_matched: true,
                adopterId: req.params.id
              }
            },
            include: includes.animal
          }
        ]
      });

      const parsedMatches = (
        nonParsedMatches as unknown as { animals: AnimalFromDb[] }
      ).animals.map(dataParser.animal);

      /* for (const animal of (
        nonParsedMatches as unknown as { animals: MatchFromDb[] }
      ).animals) {
        for (const adopter of animal.adopters as AdopterFromDb[])
          parsedMatches.push(dataParser.shelterMatch(animal, adopter));
      } */

      response.status = constants.statusCodes.ok;
      response.message = 'Matches retrieved successfully!';
      response.data = parsedMatches;
    } catch (err) {
      console.warn('ERROR AT ADOPTER-CONTROLLER-getMatches: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
