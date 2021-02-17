import { Document, Model, model, Schema } from 'mongoose';
import { IOffer } from '../types/interfaces';

export default interface IOfferModel extends IOffer, Document {
  toListJSON(): any;
  toDisplayJSON(): any;
}

const OfferSchema =  new Schema<IOfferModel>({
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
  active: { type: Boolean },
  id: { type: Schema.Types.ObjectId },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  }, {timestamps: true});

// export interface IOfferDocument extends IOffer, Document {
//   toListJSON(): any;
//   toDisplayJSON(): any;
// }

// export interface IOfferModel extends Model<IOfferDocument> {
//   owner: Schema.Types.ObjectId;
// }

OfferSchema.methods.toListJSON = function (): any {
  return {
    beerName: this.beerName,
    description: this.description,
    active: this.active,
    location: this.location,
    created: this.created,
    id: this._id.toString()
  }
}

OfferSchema.methods.toDisplayJSON = function (): any {
  return {
    beerName: this.beerName,
    description: this.description,
    packageSize: this.packageSize,
    active: this.active,
    amount: this.amount,
    location: this.location,
    recipeLink: this.recipeLink,
    created: this.created,
    id: this._id.toString(),
    owner: this.owner
  }
}



export const Offer: Model<IOfferModel> = model<IOfferModel>('Offer', OfferSchema);