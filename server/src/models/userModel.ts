import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "../types/interfaces";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { JWT_SECRET } from "../utils/secrets";

/**
 * ================================
 * Interface
 * ================================
 */

export interface IUserDocument extends IUser, Document {
  hash: string;
  salt: string;

  setPassword(password: string): Promise<void>;
  validPassword(password: string): Promise<boolean>;

  generateJWT(): string;
  generateResetJWT(): string;

  toAuthJSON(): {
    id: string;
    username: string;
    email: string;
    token: string;
  };

  getResetToken(): {
    token: string;
  };
}

/**
 * ================================
 * Schema
 * ================================
 */

const UserSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username can't be blank"],
      unique: true,
      trim: true,
      match: /^[a-zA-Z0-9]+$/,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      unique: true,
      lowercase: true,
      trim: true,
      match: /\S+@\S+\.\S+/,
      index: true,
    },
    offers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    hash: {
      type: String,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * ================================
 * Plugins
 * ================================
 */

UserSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} is already taken.",
});

/**
 * ================================
 * Password Methods (ASYNC + SAFE)
 * ================================
 */

UserSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.hash = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      password,
      this.salt,
      10000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
};

UserSchema.methods.validPassword = async function (
  password: string
): Promise<boolean> {
  if (!this.salt || !this.hash) return false;

  const hash = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      password,
      this.salt,
      10000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });

  const hashBuffer = Buffer.from(this.hash, "hex");
  const inputBuffer = Buffer.from(hash, "hex");

  if (hashBuffer.length !== inputBuffer.length) return false;

  return crypto.timingSafeEqual(hashBuffer, inputBuffer);
};

/**
 * ================================
 * JWT Methods
 * ================================
 */

UserSchema.methods.generateJWT = function (): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: "60d",
    algorithm: "HS256",
  };

  return jwt.sign(
    {
      id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
    JWT_SECRET,
    options
  );
};

UserSchema.methods.generateResetJWT = function (): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: SignOptions = {
    expiresIn: "15m",
    algorithm: "HS256",
  };

  return jwt.sign(
    {
      id: this._id.toString(),
      hash: this.hash, // becomes invalid after password change
    },
    JWT_SECRET,
    options
  );
};

/**
 * ================================
 * Output Helpers
 * ================================
 */

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id.toString(),
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

UserSchema.methods.getResetToken = function () {
  return {
    token: this.generateResetJWT(),
  };
};

/**
 * ================================
 * Hide Sensitive Fields Automatically
 * ================================
 */

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.hash;
    delete ret.salt;
    return ret;
  },
});

/**
 * ================================
 * Model
 * ================================
 */

export const User: Model<IUserDocument> = model<IUserDocument>(
  "User",
  UserSchema
);
