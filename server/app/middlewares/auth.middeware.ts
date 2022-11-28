import { Response, NextFunction } from "express";
import { MyRequest, MyResponse } from "../types/server";
import { decryptToken } from "../utils/jwt";
import constants from './../utils/constants';
import models from "../models";

const { Token } = models;

export default async function authMiddleware (req: MyRequest, res: Response, next: NextFunction) {
  const response = {...constants.fallbackResponse} as MyResponse;
  const tokenReceived = await getToken();

  if (!tokenReceived) return;

  req.token = tokenReceived;
  next();

  async function getToken () {
    try {
      const authHeader = req.get('authorization');
      if (!authHeader) throw new Error('No token!');
      const token = authHeader.split(' ')[1];
      const tokenFromDb = await Token.findOne({where: {content: token}});

      if (tokenFromDb === null) throw new Error('Token not valid!');
      decryptToken(token);

      return token;
    } catch (err) {
      console.warn('ERROR AT AUTH-MIDDLEWARE-getToken: ', err);
      response.status = constants.statusCodes.unAuthorized;
      response.message = 'Unauthorized';

      res.status(response.status).send(response);
    }
  }
}
