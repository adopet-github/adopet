import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;

export const generateToken = (obj: object) => jwt.sign(obj, TOKEN_KEY as string);
export const decryptToken = (token: string) => jwt.verify(token, TOKEN_KEY as string);