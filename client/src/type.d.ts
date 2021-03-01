export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location extends Coordinates {
  asText: string;
}

export interface IOffer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: Location;
  recipeLink?: string;
  created: string;
  id: string;
  active: boolean;
  owner: string;
  imgUrl: string;
}

export interface IOfferToDisplay extends IOffer {
  owner: {
    _id: string;
    username: string;
  }
}

export interface OfferFormValues {
  beerName: string;
  description: string;
  packageSize: string;
  amount: number;
  location: string;
  recipeLink: string;
}

export interface MessageFormValues {
  contactDetails: string;
  message: string;
}

export interface IMessage extends MessageFormValues {
  brewer: string;
  recipient: string;
  beerName: string;
}

export interface OffersState {
  offers: IOffer[]
}
export type LocationAction = {
  type: string;
  data: LatLng;
};

export interface RegisterFormValues {
  displayName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ReqResetPwFormValues {
  email: string;
}

export interface ResetPwFormValues {
  password: string;
  passwordConfirm: string;
}

export interface ChangePwFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface CurrentUser {
  id: string;
  token: string;
  displayName: string;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'googlemaps';
