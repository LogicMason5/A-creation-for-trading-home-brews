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
  recipeLink?: string;
  created: string;
  owner: string;
  id: string;
}


