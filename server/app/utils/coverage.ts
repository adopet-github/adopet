import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export default function triggerInternalServerError(req: Request) {
  if (req.query.ise) throw new Error('This error was forced');
}