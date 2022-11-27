import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db/db';
import router from './routes/v1.router';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors()).use(express.json());

app.use('/api/v1/', router);

app.use('/', (req, res) => {
  res.send('hello world');
});

(async function bootstrap() {
  await sequelize.sync({force: true});

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
})();
