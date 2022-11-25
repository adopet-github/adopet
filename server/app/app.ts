import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db/db';
import testRouter from './routes/test.router';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();


app.use('/api/v1/test', testRouter);

app.use('/', (req, res) => {
  res.send('hello world');
});

(async function bootstrap() {
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
})();
