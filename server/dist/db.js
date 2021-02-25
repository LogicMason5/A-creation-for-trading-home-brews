"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const secrets_1 = require("./utils/secrets");
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};
logger_1.default.debug(secrets_1.DB_URI);
console.log(secrets_1.DB_URI);
// Create the database connection
mongoose_1.default
    .connect(secrets_1.DB_URI, options)
    .then(() => {
    logger_1.default.info('Mongoose connection taken');
})
    .catch((e) => {
    logger_1.default.info('Mongoose connection error');
    logger_1.default.error(e);
});
// CONNECTION EVENTS
// When successfully connected
mongoose_1.default.connection.on('connected', () => {
    logger_1.default.info('Mongoose default connection open to ' + secrets_1.DB_URI);
});
// If the connection throws an error
mongoose_1.default.connection.on('error', (err) => {
    logger_1.default.error('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose_1.default.connection.on('disconnected', () => {
    logger_1.default.info('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        logger_1.default.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=db.js.map