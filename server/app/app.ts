/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db/db';
import router from './routes/v1.router';
import rateLimit from 'express-rate-limit';
const http = require('http');
const { Server } = require('socket.io');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

dotenv.config();
const PORT = process.env.PORT || 4000;

export const app = express();

if (process.env.ENVIRONMENT === 'production') app.use(limiter);

app.use(cors()).use(express.json());

app.use('/api/v1/', router);

app.use('/healthcheck', (req, res) => {
  res.send('Healthy');
});

app.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Endpoint not found, check if the URL is correct'
  });
});

export const server = http.createServer(app);

const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });

server.listen(PORT, () => {
  sequelize.sync();
  console.log(`server running on ${PORT}`);
});

export default io;
