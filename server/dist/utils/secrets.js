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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URI = exports.SENDGRID_KEY = exports.SESSION_SECRET = exports.JWT_SECRET = exports.LOG_DIRECTORY = exports.IS_PRODUCTION = exports.ENVIRONMENT = void 0;
const dotenv = __importStar(require("dotenv"));
const _ = __importStar(require("lodash"));
const path = __importStar(require("path"));
dotenv.config({ path: ".env" });
exports.ENVIRONMENT = _.defaultTo(process.env.APP_ENV, "dev");
exports.IS_PRODUCTION = exports.ENVIRONMENT === "production";
exports.LOG_DIRECTORY = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));
exports.JWT_SECRET = _.defaultTo(process.env.JWT_SECRET, "secret");
exports.SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, "secret");
exports.SENDGRID_KEY = _.defaultTo(process.env.SG_EMAIL_SENDKEY, "secret");
const env = () => {
    switch (process.env.NODE_ENV) {
        case ('dev'):
            return process.env.DEV_MONGODB_URI;
        case ('production'):
            return process.env.MONGODB_URI;
        case ('test'):
            return process.env.TEST_MONGODB_URI;
    }
};
exports.DB_URI = env();
//# sourceMappingURL=secrets.js.map