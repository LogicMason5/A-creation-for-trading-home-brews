import { ObjectId } from 'mongoose';
import { IUserModel } from '../models/userModel';


export interface ICoordinates  {
  lat: number;
  lng: number;
}

export interface IUser {
  email: string;
  username: string;
  // offers: Offer[]; //fix this to refer to the offer Model
  // users: User[]; //debugging, remove this
}

export interface IOffer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: ICoordinates;
  recipeLink?: string;
  created: string;
  owner: IUserModel;
}