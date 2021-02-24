import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../types/interfaces';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { JWT_SECRET } from "../utils/secrets";
import mongooseUniqueValidator = require("mongoose-unique-validator");


export default interface IUserModel extends IUser, Document {
  salt: string;
  hash: string;
  generateJWT(): string;
  generateResetJWT(): string;
  toAuthJSON(): any;
  getResetToken(): any;
  setPassword(password: string): void;
}

const UserSchema = new Schema<IUserModel>({
  username : {
    type     : Schema.Types.String,
    unique   : true,
    required : [true, "can't be blank"],
    match    : /^[a-zA-Z0-9]+$/,
    index    : true
  },
  email    : {
    type     : Schema.Types.String,
    lowercase: true,
    unique   : true,
    required : [true, "can't be blank"],
    match    : /\S+@\S+\.\S+/,
    index    : true
  },
  offers: [     
    {
      type: Schema.Types.ObjectId,
      ref : 'Offer'
    }
  ],
  hash: {
    type: Schema.Types.String
  },
  salt: {
    type: Schema.Types.String
  },
}, {timestamps: true});



UserSchema.plugin(mongooseUniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function (): string {
  const today = new Date();
  const exp   = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id      : this._id,
    username : this.username, 
    exp     : exp.getTime() / 1000,
  }, JWT_SECRET);
};

UserSchema.methods.generateResetJWT = function (): string {

  return jwt.sign({
    id      : this._id,
    hash    : this.hash, //using hash to generate single use token
    exp     : Math.floor(Date.now() / 1000) + (60 * 15), // 15 mins duration
  }, JWT_SECRET);
};


UserSchema.methods.toAuthJSON = function (): any {
  return {
    displayName: this.username,
    token: this.generateJWT(),
    id: this._id    
  };
};

UserSchema.methods.getResetToken = function (): any {
  return {
    token: this.generateResetJWT(),
  };
};


export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);