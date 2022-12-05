import { NextFunction, Response } from 'express';
import { MyRequest, MyResponse } from '../types/server';
import { decryptToken } from '../utils/jwt';
import constants from '../utils/constants';
import { AccountTypes } from '../enums';
import models from '../models/index';
import { notFoundChecker } from '../utils/db';

const { Animal } = models;

export default async function chatMemberMiddleware(
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  const response = { ...constants.fallbackResponse } as MyResponse;

  const decryptedToken = decryptToken(req.token as string) as unknown as {
    id: string;
    type: AccountTypes;
  };

  try {
    const { adopterId, animalId } = req.params;

    const animal = await Animal.findByPk(animalId);

    notFoundChecker(animal, animalId, response, 'Animal');

    if (
      decryptedToken.type === AccountTypes.ADMIN ||
      decryptedToken.id === adopterId ||
      decryptedToken.id ===
        (animal as unknown as { shelterId: string }).shelterId
    ) {
      next();
      return;
    }
    response.status = constants.statusCodes.unAuthorized;
    response.message = 'You should be in the chat to send or get chat messages';
  } catch (err) {
    console.warn('ERROR AT CHATMEMBER-MIDDLEWARE-chatMemberMiddleware ', err);
  }

  res.status(response.status).send(response);
}
