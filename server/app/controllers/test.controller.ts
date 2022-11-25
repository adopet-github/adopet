import { Request, Response } from "express";
import model from "../models/test.model";
import { MyResponse } from "../types";
import constants from "../utils/constants";

const controller = {
  create: async (req: Request, res: Response) => {
    const response = constants.fallbackResponse as MyResponse;

    try {
      const test = await model.create({
        test: 'test'
      });

      response.status = constants.statusCodes.created;
      response.message = 'Test created succesfully!';
      response.data = test;

    } catch (err) {
      console.warn('ERROR AT TEST-CONTROLLER-create: ', err);
      
    }

    res.status(response.status).send(response);
  },

  retrieveAll: async (req: Request, res: Response) => {
    const response = constants.fallbackResponse as MyResponse;

    try {
      const tests = await model.findAll();

      response.status = constants.statusCodes.ok;
      response.message = 'Tests retrieved successfully!';
      response.data = tests;

    } catch (err) {
      console.warn('ERROR AT TEST-CONTROLLER-retrieveAll: ', err);
      
    }

    res.status(response.status).send(response);
  },
}

export default controller;