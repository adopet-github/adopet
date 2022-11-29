import { AccountTypes } from '../enums';
import { NextFunction, Response } from 'express';
import { MyRequest } from '../types/server';
import { decryptToken } from '../utils/jwt';
import constants from '../utils/constants';

export default function reflexiveMiddleware(paramsKey = 'id') {
  return async (req: MyRequest, res: Response, next: NextFunction) => {
    const response = { ...constants.fallbackResponse };
    const decryptedToken = decryptToken(req.token as string) as unknown as {
      id: string;
      type: AccountTypes;
    };

    if (decryptedToken.id === req.params[paramsKey]) {
      next();
      return;
    }

    response.status = constants.statusCodes.unAuthorized;
    response.message = 'You can only perform this operation for yourself';

    res.status(response.status).send(response);
  };
}
