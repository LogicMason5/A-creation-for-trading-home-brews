import { Document, Model, model, Schema } from 'mongoose';
import { IOffer } from '../types/interfaces';

export default interface IOfferModel extends IOffer, Document {
  toListJSON(): any;
  toDisplayJSON(): IOffer;
}

const OfferSchema =  new Schema<IOfferModel>({
  beerName: { type: String, required: true },
  description: { type: String, required: true },
  packageSize: { type: String },
  amount: { type: Number },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    asText: { type: String }
  },
  recipeLink: { type: String },
  imgUrl: { type: String },
  updatedAt: { type: Date },
  active: { type: Boolean },
  id: { type: Schema.Types.ObjectId },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  }, {timestamps: true});

OfferSchema.methods.toListJSON = function (): any {
  return {
    beerName: this.beerName,
    description: this.description,
    active: this.active,
    location: this.location,
    created: this.updatedAt.toString(),
    id: this._id.toString()
  };
};

OfferSchema.methods.toDisplayJSON = function (): any {
  return {
    beerName: this.beerName,
    description: this.description,
    packageSize: this.packageSize,
    active: this.active,
    amount: this.amount,
    location: this.location,
    recipeLink: this.recipeLink,
    imgUrl: this.imgUrl,
    created: this.updatedAt.toString(),
    id: this._id.toString(),
    owner: this.owner
  };
};



export const Offer: Model<IOfferModel> = model<IOfferModel>('Offer', OfferSchema);