import { MyRequest, MyResponse } from '../types/server';
import { Response, NextFunction } from 'express';
import { decryptToken } from '../utils/jwt';
import constants from '../utils/constants';
import { AccountTypes } from '../enums';
import models from '../models';
import { notFoundChecker } from '../utils/db';
const { Animal } = models;

export default function selfShelterMiddleware(
  key = 'id',
  objectToCheck = 'params'
) {
  return async (req: MyRequest, res: Response, next: NextFunction) => {
    const response = { ...constants.fallbackResponse } as MyResponse;
    const decryptedToken = decryptToken(req.token as string) as unknown as {
      id: string;
      type: AccountTypes;
    };

    try {
      if (
        (objectToCheck === 'body' &&
        decryptedToken.id === req.body.shelterId) ||
        decryptedToken.type === AccountTypes.ADMIN
      ) {
        next();
        return;
      } else {
        if (objectToCheck === 'body') {
          response.status = constants.statusCodes.unAuthorized;
          response.message =
            'You are only allowed to create animals for your own shelter';
          throw new Error(response.message);
        }
      }
      const animal = await Animal.findByPk(
        req[objectToCheck as 'params' | 'body'][key]
      );
      notFoundChecker(
        animal,
        req[objectToCheck as 'params' | 'body'][key],
        response,
        'Animal'
      );

      if (
        (animal as unknown as { shelterId: string }).shelterId ===
        decryptedToken.id
      ) {
        next();
        return;
      }

      response.status = constants.statusCodes.unAuthorized;
      response.message =
        'You can only perform this operation for your own shelter animals';
    } catch (err) {
      console.warn(
        'ERROR AT SELFSHELTER-MIDDLEWARE-selfShelterMiddleware: ',
        err
      );
    }

    res.status(response.status).send(response);
  };
}
