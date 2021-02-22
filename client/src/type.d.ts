export interface Coordinates  {
  lat: number;
  lng: number;
}

export interface IOffer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: Coordinates;
  recipeLink?: string;
  created: string;
  id: string;
  active: boolean;
  owner: string;
  imgUrl?: string;
}

export interface IOfferToDisplay extends IOffer {
  owner: {
    id: string;
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

export interface ResetPwFormValues {
  email: string;
}

export interface CurrentUser {
  id: string;
  token: string;
  displayName: string;
}

export type OfferAction = OneOfferAction | IdOfferAction;

export type LocationDispatch = (args: LocationAction) => LocationAction;

export type OfferDispatch = (args: OfferAction) => OfferAction;

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'googlemaps';