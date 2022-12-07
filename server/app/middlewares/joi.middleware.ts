import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { InputTypes } from '../enums';
import constants from '../utils/constants';

export default function joiMiddleware(
  schema: Joi.ObjectSchema,
  where: InputTypes
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const typeToObjToValidate = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const objToValidate = typeToObjToValidate[where];

    const result = schema.validate(objToValidate);

    if (result.error) {
      const response = {
        status: constants.statusCodes.badRequest,
        message: result.error.details.map((el) => el.message)
      };

      res.status(response.status).send(response);
    } else {
      next();
    }
  };
}
