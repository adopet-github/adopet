import { NextFunction, Response } from "express";
import { AccountTypes } from "../enums";
import { MyRequest } from "../types/server";
import constants from "../utils/constants";
import { decryptToken } from "../utils/jwt";

export default function isRoleMiddleware (role: AccountTypes) {
  return (req: MyRequest, res: Response, next: NextFunction) => {
    const response = {...constants.fallbackResponse};
    const decryptedToken = (decryptToken(req.token as string) as unknown as {id: number, type: AccountTypes});
  
    if (decryptedToken.type === role || decryptedToken.type === AccountTypes.ADMIN) {
      next();
      return;
    }

    response.status = constants.statusCodes.unAuthorized;
    response.message = `You have to be a ${role} to perform this operation`;
  
    res.status(response.status).send(response);

  }
}