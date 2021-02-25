"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const fs = __importStar(require("fs"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const secrets_1 = require("./secrets");
let dir = secrets_1.LOG_DIRECTORY;
// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir);
}
const logLevel = secrets_1.ENVIRONMENT === 'dev' ? 'debug' : 'warn';
const options = {
    file: {
        level: logLevel,
        filename: dir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorize: true,
        maxFiles: '14d',
    },
};
exports.default = winston_1.createLogger({
    transports: [
        new winston_1.transports.Console({
            stderrLevels: ["info", "error"],
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.prettyPrint()),
        }),
    ],
    exceptionHandlers: [new winston_daily_rotate_file_1.default(options.file)],
    exitOnError: false,
});
//# sourceMappingURL=logger.js.map