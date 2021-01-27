import { Document, Model, Mongoose, ObjectId } from 'mongoose';
import User from './models/userModel'

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

export interface ThirdPartyAuth {
  providerName: string;
  providerId: string;
  providerData: any;
}

export interface IUserPublic {
  username: string;

}



export interface IOfferDocument extends Document, Omit<IOffer, "id"> {

}






