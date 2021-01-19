/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Coordinates, Offer } from "./type";

export const toNewOffer = (object: any): Omit<Offer, "id"> => {
  console.log('in toNewOffer')
  console.log(object)
  const newOffer: Omit<Offer, "id"> = {
    beerName: parseAsString(object.beerName, "beerName"),
    description: parseAsString(object.description, "description"),
    packageSize: object.packageSize ? parseAsString(object.packageSize, "packageSize") : undefined,
    amount: object.amount ? parseAsNumber(object.amount, "amount") : undefined,
    location: parseAsCoordinates(object.location, "location"),
    recipeLink: object.recipeLink ? parseAsString(object.recipeLink, "recipeLink") : undefined,
    created: parseAsDate(object.created, "created"),
    owner: parseAsString(object.owner, "owner"),
  };
  return newOffer;
};

const parseAsString = (value: any, key: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${key}. Found: ${value}`);
  }
  return value;
};

const parseAsNumber = (value: any, key: string): number => {
  if(!value || !isNumber(value)) {
    throw new Error(`Incorrect or missing ${key}. Found: ${value}`);
  }
  return value;
};

const parseAsDate = (value: any, key: string): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(`Incorrect or missing ${key}. Found: ${value}`);
  }
  return value;
};

const parseAsCoordinates = (value: any, key: string): Coordinates => {
  if(!value || !isCoordinates(value)) {
    throw new Error(`Incorrect or missing ${key}. Found: ${value}`);
  }
  return value
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (num: number): num is number => {
  return typeof num === 'number';
};

const isCoordinates = (param: any): param is Coordinates => {
  return(isNumber(param.lat) && isNumber(param.lng))
}
