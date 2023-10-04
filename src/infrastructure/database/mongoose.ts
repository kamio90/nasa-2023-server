import logger from '@infrastructure/log/logger';
import * as mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/circle-edge-server', {});

    logger.info('Connected to database');
  } catch (error) {
    logger.error('Error connecting to the database:', error);
  }
}
