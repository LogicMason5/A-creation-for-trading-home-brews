import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as path from "path";

dotenv.config({path: ".env"});

export const ENVIRONMENT    = _.defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION  = ENVIRONMENT === "production";
export const LOG_DIRECTORY  = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));
export const JWT_SECRET     = _.defaultTo(process.env.JWT_SECRET, "secret");
export const SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, "secret");
export const SENDGRID_KEY   = _.defaultTo(process.env.SG_EMAIL_SENDKEY, "secret");

const getDB_URI = (): string => {

  if (process.env.TS_NODE_DEV) return process.env.DEV_MONGODB_URI;

  switch (process.env.NODE_ENV) {
    case('production'):
      return process.env.MONGODB_URI;
    case('test'):
      return process.env.TEST_MONGODB_URI;
  }

};

export const DB_URI = getDB_URI();

