import { ObjectId } from 'mongoose';
import { IOfferModel } from '../models/offerModel';
import { IUserModel } from '../models/userModel';


export interface ICoordinates  {
  lat: number;
  lng: number;
}

export interface IUser {
  email: string;
  username: string;
  offers: IOfferModel[];
}

export interface IOffer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: ICoordinates;
  recipeLink?: string;
  active: boolean;
  created: string;
  owner: IUserModel;
}