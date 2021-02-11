export interface Coordinates  {
  lat: number;
  lng: number;
}

export interface IPubOffer {
  beerName: string;
  description: string;
  location: Coordinates;
  recipeLink?: string;
  created: string;
  ownerId: string;
  ownerDisplayName: string
  id: string;
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
  ownerId: string;
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

export interface OffersState {
  offers: IOffer[]
}
export type LocationAction = {
  type: string;
  data: LatLng;
};

type OneOfferAction = {
  type: string;
  data: Offer;
};

type IdOfferAction = {
  type: string;
  data: string;
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

export interface CurrentUser {
  id: string;
  token: string;
  displayName: string;
}

export type OfferAction = OneOfferAction | IdOfferAction;

export type LocationDispatch = (args: LocationAction) => LocationAction;

export type OfferDispatch = (args: OfferAction) => OfferAction;