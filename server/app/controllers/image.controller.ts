import { Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import models from '../models';

const { Image } = models;

const controller = {
  delete: async (req: Request, res: Response) => {
    const response = { ...constants.fallbackResponse } as MyResponse;

    try {
      const { id } = req.params;

      const rowsDeleted = await Image.destroy({ where: { id } });

      if (rowsDeleted === 0) {
        response.status = constants.statusCodes.notFound;
        response.message = `Image with id ${id} not found.`;
        throw new Error(response.message);
      }

      response.status = constants.statusCodes.ok;
      response.message = 'Image deleted succesfully!';
    } catch (err) {
      console.warn('ERROR AT IMAGE-CONTROLLER-delete: ', err);
    }

    res.status(response.status).send(response);
  },
};

export default controller;