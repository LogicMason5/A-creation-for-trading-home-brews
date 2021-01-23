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

export interface ThirdPartyAuth {
  providerName: string;
  providerId: string;
  providerData: any;
}

export interface IUser {
  username: string;
  email: string;
  emailIsVerified?: boolean;
  passwordHash: string;
  thirdPartyAuth?: ThirdPartyAuth;
  offers?: IOffer[];
  id: ObjectId

}

export interface IUserDocument extends Document, Omit<IUser, "id" > {

}

export interface IOfferDocument extends Document, Omit<IOffer, "id"> {

}




