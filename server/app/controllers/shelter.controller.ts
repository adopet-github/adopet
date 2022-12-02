import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import { imageSanitize, shelterSanitize } from '../utils/sanitize';
import models, { relationships } from '../models';
import sequelize from '../db/db';
import { Model } from 'sequelize';
import Location from '../models/location.model';
import { Image as ImageType } from '../types/models';
import { notFoundChecker } from '../utils/db';
import includes from '../utils/includes';
import dataParser from '../utils/dataparser';
import { AdopterFromDb, MatchFromDb, ShelterFromDb } from '../types/dboutputs';
import { generateToken } from '../utils/jwt';
import { genPasswordAndSalt } from '../utils/password';
import { v4 as uuidv4 } from 'uuid';

const { General, Shelter, User, Image, Token } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const modelResponse = await Shelter.findAll({
        include: includes.shelter
      });

      response.status = constants.statusCodes.ok;
      response.message = 'Shelters retrieved successfully!';
      response.data = (modelResponse as unknown as ShelterFromDb[]).map(
        dataParser.shelter
      );
    } catch (err) {
      console.warn('ERROR AT SHELTER-CONTROLLER-retrieveAll: ', err);
    }

    res.status(response.status).send(response);
  },

  retrieveOne: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;
      const shelter = await Shelter.findByPk(id, {
        include: includes.shelter
      });

      notFoundChecker(shelter, id, response, 'Shelter');

      response.status = constants.statusCodes.ok;
      response.message = 'Shelter retrieved successfully!';
      response.data = dataParser.shelter(shelter as unknown as ShelterFromDb);
    } catch (err) {
      console.warn('ERROR AT SHELTER-CONTROLLER-retrieveOne: ', err);
    }

    res.status(response.status).send(response);
  },

  create: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeCreate } = shelterSanitize;

    const unsafeBody = req.body;

    const safeBody = sanitizeCreate(unsafeBody);

    const adopterPassword = safeBody.password;
    const passSaltObj = await genPasswordAndSalt(adopterPassword as string);
    safeBody.password = passSaltObj.password;
    safeBody.salt = passSaltObj.salt;

    const transaction = await sequelize.transaction();
    try {
      const shelter = await General.create(
        {
          id: uuidv4(),
          description: safeBody.description,
          user: {
            id: uuidv4(),
            email: safeBody.email,
            password: safeBody.password,
            salt: safeBody.salt,
            shelter: {
              id: uuidv4(),
              name: safeBody.name
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
              include: [relationships.user.shelter, relationships.user.location]
            }
          ],
          transaction
        }
      );
      const responseToken = await Token.create({
        id: uuidv4(),
        content: generateToken({
          id: (shelter as unknown as { user: { shelter: { id: string } } }).user
            .shelter.id,
          type: 'shelter'
        })
      });
      response.token = (
        responseToken as unknown as { content: string }
      ).content;

      await transaction.commit();
      response.status = constants.statusCodes.created;
      response.data = (
        shelter as unknown as { user: { shelter: { id: string } } }
      ).user.shelter.id;
      response.message = 'Shelter created succesfully!';
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT SHELTER-CONTROLLER-create: ', err);
    }

    res.status(response.status).send(response);
  },

  update: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const { sanitizeUpdate } = shelterSanitize;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;

      const unsafeBody = req.body;

      const safeBody = sanitizeUpdate(unsafeBody);

      const shelter = await Shelter.findByPk(id, {
        include: [
          {
            association: relationships.shelter.user,
            include: [relationships.user.general]
          },
          {
            association: relationships.shelter.animals
          }
        ]
      });

      notFoundChecker(shelter, id, response, 'Shelter');

      const user = await User.findByPk(
        (shelter as unknown as { user: { id: number } }).user.id,
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

      await (shelter as Model).update(
        {
          name: safeBody.name
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

      const updatedShelter = await Shelter.findByPk(id, {
        transaction,
        include: includes.shelter
      });

      await transaction.commit();
      response.status = constants.statusCodes.ok;
      response.message = 'Shelter updated succesfully!';
      response.data = dataParser.shelter(
        updatedShelter as unknown as ShelterFromDb
      );
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT SHELTER-CONTROLLER-update: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const shelter = await Shelter.findByPk(id, {
        include: [relationships.shelter.user],
        transaction
      });

      notFoundChecker(shelter, id, response, 'Shelter');
      const userId = (shelter as unknown as { user: { id: number } }).user.id;
      const generalId = (shelter as unknown as { user: { generalId: number } })
        .user.generalId;

      await Shelter.destroy({ where: { id }, transaction });
      await User.destroy({ where: { id: userId }, transaction });
      await General.destroy({ where: { id: generalId }, transaction });

      await transaction.commit();

      response.status = constants.statusCodes.ok;
      response.message = 'Shelter deleted succesfully!';
    } catch (err) {
      await transaction.rollback();
      console.warn('ERROR AT SHELTER-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  },
  addManyImages: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    const { sanitizeCreate } = imageSanitize;

    try {
      const { id } = req.params;

      const shelter = await Shelter.findByPk(id, {
        include: [
          {
            association: relationships.shelter.user,
            include: [relationships.user.general]
          }
        ]
      });

      notFoundChecker(shelter, id, response, 'Shelter');

      const { images } = req.body;
      const mappedImages = images.map((image: ImageType) => ({
        ...sanitizeCreate(image),
        id: uuidv4(),
        generalId: (shelter as unknown as { user: { generalId: number } }).user
          .generalId
      }));
      const createdImages = await Image.bulkCreate(mappedImages);
      response.status = constants.statusCodes.ok;
      response.message = 'Images added to shelter succesfully!';
      response.data = createdImages;
    } catch (err) {
      console.warn('ERROR AT SHELTER-CONTROLLER-addManyImages: ', err);
    }
    res.status(response.status).send(response);
  },

  getMatches: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const nonParsedMatches = await Shelter.findByPk(req.params.id, {
        include: [
          {
            association: relationships.shelter.animals,
            include: [
              {
                association: relationships.animal.adopters,
                through: {
                  where: { is_matched: true }
                },
                include: includes.adopter
              },
              {
                association: relationships.animal.general,
                include: [relationships.general.images]
              }
            ]
          }
        ]
      });

      const parsedMatches = [];

      for (const animal of (
        nonParsedMatches as unknown as { animals: MatchFromDb[] }
      ).animals) {
        for (const adopter of animal.adopters as AdopterFromDb[])
          parsedMatches.push(dataParser.shelterMatch(animal, adopter));
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Matches retrieved successfully!';
      response.data = parsedMatches;
    } catch (err) {
      console.warn('ERROR AT SHELTER-CONTROLLER-getMatches: ', err);
    }

    res.status(response.status).send(response);
  },
  getLikes: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const nonParsedLikes = await Shelter.findByPk(req.params.id, {
        include: [
          {
            association: relationships.shelter.animals,
            include: [
              {
                association: relationships.animal.adopters,
                through: {
                  where: { is_liked: true }
                },
                include: includes.adopter
              },
              {
                association: relationships.animal.general,
                include: [relationships.general.images]
              }
            ]
          }
        ]
      });

      const parsedLikes = [];

      for (const animal of (
        nonParsedLikes as unknown as { animals: MatchFromDb[] }
      ).animals) {
        for (const adopter of animal.adopters as AdopterFromDb[])
          parsedLikes.push(dataParser.shelterMatch(animal, adopter));
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Likes retrieved successfully!';
      response.data = parsedLikes;
    } catch (err) {
      console.warn('ERROR AT SHELTER-CONTROLLER-getLikes: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
