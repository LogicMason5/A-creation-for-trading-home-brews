import React from 'react';
import { OfferFormValues } from '../type';
import OfferForm from './OfferForm';
import { createOffer } from './offerSlice';


const CreateOffer: React.FC = () => {

  const newOfferValues: OfferFormValues = {
    beerName: "",
    description: "",
    packageSize: "",
    amount: 2,
    location: "",
    recipeLink: ""
  };

  return (
    <OfferForm formTitle="Create a new offer" initValues={newOfferValues} actionOnSubmit={createOffer}/>
  );
};

export default CreateOffer;