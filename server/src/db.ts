import mongoose from 'mongoose';
import logger from "./utils/logger";
import { DB_URI } from './utils/secrets';

const options = {
  useNewUrlParser   : true,
  useCreateIndex    : true,
  useUnifiedTopology: true,
  useFindAndModify  : false,
  autoIndex         : true,
  poolSize          : 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries  : 0,
  connectTimeoutMS  : 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS   : 45000, // Close sockets after 45 seconds of inactivity
};

logger.debug(DB_URI);
console.log(DB_URI);
console.log(process.env.NODE_ENV)
// console.log(process.env)

// Create the database connection
mongoose
  .connect(DB_URI, options)
  .then(() => {
    logger.info('Mongoose connection taken');
  })
  .catch((e) => {
    logger.info('Mongoose connection error');
    logger.error(e);
  });

  
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection open to ' + DB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});