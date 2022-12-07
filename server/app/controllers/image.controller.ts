import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import models from '../models';
import { notFoundChecker } from '../utils/db';
import triggerInternalServerError from '../utils/coverage';

const { Image } = models;

const controller = {
  retrieveAll: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      triggerInternalServerError(req);
      const modelResponse = await Image.findAll();

      response.status = constants.statusCodes.ok;
      response.message = 'Images retrieved successfully!';
      response.data = modelResponse;
    } catch (err) {
      console.warn('ERROR AT IMAGE-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  },

  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;

      const rowsDeleted = await Image.destroy({ where: { id } });

      notFoundChecker(rowsDeleted, id, response, 'Image');

      response.status = constants.statusCodes.ok;
      response.message = 'Image deleted succesfully!';
    } catch (err) {
      console.warn('ERROR AT IMAGE-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  }
};

export default controller;
