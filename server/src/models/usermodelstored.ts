import mongoose, { Document, Model, model, Types, Schema, Query } from "mongoose"
import { ThirdPartyAuth } from '../type';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";
import validator from "validator";

const ThirdPartyProviderSchema = new mongoose.Schema({
  providerName: {
      type: String,
      default: null
  },
  providerId: {
      type: String,
      default: null
  },
  providerData: {
      type: {},
      default: null
  }
});

const UserSchema: Schema<UserDocument, IUserModel>  =  new Schema({
  username: { 
    type: String, 
    required: [true, 'userName is required'], 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email address"]
  },
  passwordHash: { 
    type: String ,
    required: [true, "password is required"],
    minlength: 8 // add more requirements
  },
  thirdPartyAuth: 
    [ThirdPartyProviderSchema],
  offers:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Offer'
    }
  ]
   ,
  id: mongoose.Schema.Types.ObjectId
  
  
});

export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  thirdPartyAuth?: ThirdPartyAuth;
  offers?: Types.ObjectId[];
  _id: Types.ObjectId;
}

type UserDocument = IUser & Document;

export interface IUserModel extends Model<UserDocument> {
  checkExistingField(arg0: string, displayName: any): Promise<boolean>;
  findMyOffers(id: string[]): Promise<UserDocument>
}

export type PublicUserModel = Omit<IUserModel, "passwordHash" | "email" >

UserSchema.statics.findMyOffers = async function(
  this: Model<UserDocument>,
  id: string
) {
  return this.findById(id).populate("offers").exec() // this only finds one, fix later
}

UserSchema.pre("save", async function (next) {
  if (!this.passwordHash || !this.isModified("password")) return next;

  this.passwordHash = await bcrypt.hash(
    this.passwordHash,
    10
  );
  next();
});

UserSchema.set('toJSON', {
  transform: (_document: UserDocument, returnedObject: UserDocument) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // delete returnedObject.passwordHash;
    // delete returnedObject.email;
  }
});

UserSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: "10d",
    algorithm: "RS256",
  });
};

UserSchema.statics.checkExistingField = async function (field, value)  {
  const checkField = await User.findOne({ [`${field}`]: value });

  return checkField;
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};


const User = mongoose.model("User", UserSchema);

export default User;