export interface Coordinates  {
  lat: number;
  lng: number;
}

export interface Offer {
  beerName: string;
  description: string;
  packageSize?: string;
  amount?: number;
  location: Coordinates;
  recipeLink: string;
  created: string;
  owner: string;
  id: string;
}

export interface OffersState {
  offers: Offer[]
}
export type LocationAction = {
  type: string;
  data: LatLng;
}

type OneOfferAction = {
  type: string;
  data: Offer
}

type IdOfferAction = {
  type: string;
  data: string
}

export type OfferAction = OneOfferAction | IdOfferAction

export type LocationDispatch = (args: LocationAction) => LocationAction

export type OfferDispatch = (args: OfferAction) => OfferAction