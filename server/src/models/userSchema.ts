import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../type';

const uniqueValidator = require('mongoose-unique-validator')

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

const UserSchema: Schema =  new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  emailIsVerified: { 
    type: Boolean 
  },
  passwordHash: { 
    type: String 
  },
  thirdPartyAuth: 
    [ThirdPartyProviderSchema],
  offers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }
  ]
   ,
  id: mongoose.Schema.Types.ObjectId
  
  
});

UserSchema.set('toJSON', {
  transform: (_document: any, returnedObject: IUserDocument) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model<IUserDocument>('User', UserSchema);