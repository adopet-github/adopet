import { Request } from 'express';

export type MyResponse = {
  status: number;
  message: string;
  data: unknown;
  token?: string;
};

export type MyRequest = Request & {
  token?: string;
};
