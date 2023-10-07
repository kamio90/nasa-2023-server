import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from '@infrastructure/database/mongoose';
import logger from '@infrastructure/log/logger';
import 'dotenv/config';
import userRouter from '@application/routes/user.router';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(bodyParser.json());

(async () => {
  try {
    await connectToDatabase();
    app.use('/user', userRouter);
    app.listen(PORT, () => {
      logger.info(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error connecting to the database:', error);
  }
})().catch((error) => {
  logger.error('Unhandled promise rejection:', error);
});
