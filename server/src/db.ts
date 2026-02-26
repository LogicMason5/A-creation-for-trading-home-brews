import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { DB_URI } from '../utils/secrets.js';

let isConnected = false;

/**
 * Connect to MongoDB
 */
export const connectDB = async () => {
  if (isConnected) {
    logger.info('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(DB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      autoIndex: process.env.NODE_ENV !== 'production',
    });

    isConnected = true;

    logger.info('✅ MongoDB connection established');
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    process.exit(1); // Fail fast (recommended for production)
  }
};

/**
 * Mongoose Connection Events
 */
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected');
});

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    logger.info(`MongoDB connection closed due to ${signal}`);
    process.exit(0);
  } catch (err) {
    logger.error('Error during MongoDB shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));     // Ctrl+C
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));   // Docker/K8s
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));   // Nodemon
