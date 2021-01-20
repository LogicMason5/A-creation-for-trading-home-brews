import { Document, Mongoose, ObjectId } from 'mongoose';

export interface ICoordinates  {
  lat: number;
  lng: number;
}

export interface IOffer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: ICoordinates;
  recipeLink?: string;
  created: string;
  owner: string;
  id: ObjectId;
}

export interface IOfferDocument extends Document, Omit<IOffer, "id"> {

}

export type IPubOffer = Omit<IOffer, "owner">


