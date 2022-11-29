import { AccountTypes } from "../enums";
import { MyRequest, MyResponse } from "../types/server";
import { Response, NextFunction } from "express";
import constants from "../utils/constants";
import models from "../models";
import { ModelCtor } from "sequelize";
import includes from "../utils/includes";
import { notFoundChecker } from "../utils/db";
import dataParser from "../utils/dataparser";
import { Image } from './../types/models';

const { Adopter, Animal, Shelter } = models;

export default function imageLimitMiddleware (type: AccountTypes | 'animal') {
  return async (req: MyRequest, res: Response, next: NextFunction) => {
    const response = {...constants.fallbackResponse} as MyResponse;
    const id = Number(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelEquivalences: {[key: string]: ModelCtor<any>} = {
      adopter: Adopter,
      animal: Animal,
      shelter: Shelter
    };

    
    try {
      const Model = modelEquivalences[type];  
      const modelResponse = await Model.findByPk(id, {include: includes[type]});
      notFoundChecker(modelResponse, id, response, `${type[0].toUpperCase()}${type.slice(1)}`);

      let images: Image[] = [];
      switch (type) {
        case AccountTypes.ADOPTER:
          images = dataParser.adopter(modelResponse).images as Image[];
          break;
        case AccountTypes.SHELTER:
          images = dataParser.shelter(modelResponse).images as Image[];
          break;
        case 'animal':
          images = dataParser.animal(modelResponse).images as Image[];
          break;
      }

      const imagesFromBody = req.body.images as unknown as Image[];

      if (images.length + imagesFromBody.length > 4) {
        response.status = constants.statusCodes.badRequest;
        response.message = `A ${type[0].toUpperCase()}${type.slice(1)} can not have more than 4 images`;
        throw new Error('Image limit exceeded');
      }

      next();
      return;

    } catch (err) {
      console.warn('ERROR AT IMAGELIMIT-MIDDLEWARE-imageLimitMiddleware ', err);
    }

    res.status(response.status).send(response);
  }
}