import React from 'react';
import { OfferFormValues } from '../type';
import EditOfferForm from './OfferForm';
import { createOffer } from './offerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';



const CopyOffer: React.FC = () => {

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

  return (
    <EditOfferForm initValues={copiedOfferValues} actionOnSubmit={createOffer}/>
  );
};

export default CopyOffer;