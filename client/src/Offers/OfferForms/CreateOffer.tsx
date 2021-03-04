import React from 'react';
import { useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import OfferForm from './OfferForm';
import { createOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import MustBeLogged from '../../Display/MustBeLogged';

const CreateOffer: React.FC = () => {
  const newOfferValues: OfferFormValues = {
    beerName: '',
    description: '',
    packageSize: '',
    amount: 2,
    location: '',
    recipeLink: '',
    reviewLink: '',
  };

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    isLoggedIn
      ? (
        <OfferForm
          formTitle="Create a new offer"
          initValues={newOfferValues}
          actionOnSubmit={createOffer}
          buttonText="create the offer"
        />
      )
      : (<MustBeLogged reason="to create an offer." />)
  );
};

export default CreateOffer;
