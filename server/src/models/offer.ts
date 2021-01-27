import mongoose, { Schema } from 'mongoose';
import { IOffer, IOfferDocument } from '../type';

//NEEDS TO BE CLEANED UP TO BE CONSISTEND WITH USER

const OfferSchema: Schema =  new Schema({
  beerName: { type: String, required: true },
  description: { type: String, required: true },
  packageSize: { type: String },
  amount: { type: Number },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  recipeLink: { type: String },
  created: { type: String, required: true },
  owner: { type: String }, //change to ref later
  // {
  //   type: mongo.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  id: mongoose.Schema.Types.ObjectId
  });

OfferSchema.set('toJSON', {
  transform: (_document: any, returnedObject: IOfferDocument) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model<IOfferDocument>('Offer', OfferSchema);