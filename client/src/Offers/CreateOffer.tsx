import React from 'react';
import { OfferFormValues } from '../type';
import EditOfferForm from './OfferForm';
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
    <EditOfferForm initValues={newOfferValues} actionOnSubmit={createOffer}/>
  );
};

export default CreateOffer;