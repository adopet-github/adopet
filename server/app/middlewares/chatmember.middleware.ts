import { NextFunction, Response } from "express";
import { MyRequest } from "../types/server";
import { decryptToken } from "../utils/jwt";
import constants from "../utils/constants";
import { AccountTypes } from "../enums";

export default function chatMemberMiddleware (req: MyRequest, res: Response, next: NextFunction) {
  const response = {...constants.fallbackResponse};

  const decryptedToken = (decryptToken(req.token as string) as unknown as {id: number, type: AccountTypes});
  const { adopterId, shelterId } = req.params;

  if (decryptedToken.id === Number(adopterId) || decryptedToken.id === Number(shelterId)) {
    next();
    return;
  }

  response.status = constants.statusCodes.unAuthorized;
  response.message = 'You should be in the chat to send or get chat messages';

  res.status(response.status).send(response);
}