import { NextFunction, Request, Response } from "express";
import models from "../models";
import constants from "../utils/constants";
const { User } = models;

export default async function userExistsMiddleware (req: Request, res: Response, next: NextFunction) {
  const response = {...constants.fallbackResponse};

  const user = await User.findOne({
    where: {email: req.body.email},
  });

  if (user === null) {
    next();
    return;
  }

  response.status = constants.statusCodes.badRequest;
  response.message = `User with email ${req.body.email} already exists!`;

  res.status(response.status).send(response);
}