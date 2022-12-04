import { NextFunction, Request, Response } from 'express';
import { MyResponse } from '../types/server';
import constants from '../utils/constants';
import models, { relationships } from '../models';
import { notFoundChecker } from '../utils/db';
const { User } = models;

export default async function isGoogleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response = { ...constants.fallbackResponse } as MyResponse;

  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [relationships.user.adopter]
    });
    notFoundChecker(user, 'userid', response, 'User');

    const password = (user as unknown as { password: string | null }).password;

    if (password === null) {
      response.status = constants.statusCodes.badRequest;
      response.message = 'Google account detected, log in with Google instead';
      throw new Error(response.message);
    }

    next();
    return;
  } catch (err) {
    if (response.status === constants.statusCodes.notFound) {
      response.status = constants.statusCodes.badRequest;
      response.message = 'Username or password not correct';
    }

    console.warn('ERROR AT ISGOOGLE-MIDDLEWARE-isGoogleMiddleware: ', err);
  }

  res.status(response.status).send(response);
}
