import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import OfferForm from './OfferForm';
import { createOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import MustBeLogged from '../../Display/MustBeLogged';
import { setOfferUploadUrl } from '../../Display/displaySlice';

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOfferUploadUrl(''));
  }, [dispatch]);

  if (!isLoggedIn) return <MustBeLogged reason="to create an offer." />;

  return (
    <OfferForm
      formTitle="Create a new offer"
      initValues={newOfferValues}
      actionOnSubmit={createOffer}
      buttonText="create the offer"
    />
  );
};

export default CreateOffer;
