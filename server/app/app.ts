import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use('/', (req, res) => {
  res.send('hello world');
});
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
