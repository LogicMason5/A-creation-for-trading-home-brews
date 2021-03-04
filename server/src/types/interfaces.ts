import IOfferModel from '../models/offerModel';
import IUserModel from '../models/userModel';

export interface ILocation {
  asText?: string
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
  location: ILocation;
  recipeLink?: string;
  reviewLink?: string;
  imgUrl?: string;
  active: boolean;
  created: string;
  owner: IUserModel;
  updatedAt: string;
}

export interface IMessage {
  beerName: string
  message: string,
  contactDetails: string
}