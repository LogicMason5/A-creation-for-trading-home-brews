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
  reviewLink?: string;
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
  reviewLink: string;
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
  username: string;
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
  username: string;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { cloudinary: any; }
}

window.MyNamespace = window.cloudinary || {};

declare module 'googlemaps';

declare module 'material-ui-cookie-consent';
