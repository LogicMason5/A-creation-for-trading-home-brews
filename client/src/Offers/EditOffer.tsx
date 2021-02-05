import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { OfferFormValues } from '../type';
import EditOfferForm from './OfferForm';
import { updateSelectedOffer } from './offerSlice';
import { RootState } from '../rootReducer';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import { useAsyncDispatch } from '../store';



const CreateOffer: React.FC = () => {

  const dispatch = useAsyncDispatch();

  const selectedOffer = useSelector(
    (state: RootState) => state.offers.selectedOffer
  );

  const copiedOfferValues: OfferFormValues = {
    beerName: selectedOffer.beerName,
    description: selectedOffer.description,
    packageSize: selectedOffer.packageSize ? selectedOffer.packageSize : '',
    amount: selectedOffer.amount ? selectedOffer.amount : 2,
    location: '',
    recipeLink: selectedOffer.recipeLink ? selectedOffer.recipeLink : ''
  };

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <EditOfferForm initValues={copiedOfferValues} actionOnSubmit={updateSelectedOffer}/>
  );
};

export default CreateOffer;