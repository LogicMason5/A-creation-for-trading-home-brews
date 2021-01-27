import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { IOffer } from '../interfaces';

//NEEDS TO BE CLEANED UP TO BE CONSISTEND WITH USER

const OfferSchema =  new Schema<IOfferDocument, IOfferModel>({
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
  id: { type: Schema.Types.ObjectId },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  });

export interface IOfferDocument extends IOffer, Document {
  toJSON(): any;

}

export interface IOfferModel extends Model<IOfferDocument> {
  owner: Schema.Types.ObjectId;
}

OfferSchema.methods.toJSON = function (): any {
  return {
    beerName: this.beerName,
    description: this.description,
    packageSize: this.packageSize,
    amount: this.amount,
    location: this.location,
    recipeLink: this.recipeLink,
    created: this.created,
    id: this._id.toString()
  }
}



export default model<IOfferDocument, IOfferModel>('Offer', OfferSchema);