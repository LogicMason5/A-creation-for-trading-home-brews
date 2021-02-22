import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import OfferForm from './OfferForm';
import { updateSelectedOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import { setOfferUploadUrl } from '../../Navigation/displaySlice';



const CreateOffer: React.FC = () => {

  const dispatch = useDispatch();

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

  if (selectedOffer.imgUrl) {
    dispatch(setOfferUploadUrl(selectedOffer.imgUrl));
  }

  return (
    <OfferForm 
      formTitle={`Editing offer for ${selectedOffer.beerName}`}
      initValues={copiedOfferValues}
      actionOnSubmit={updateSelectedOffer}
      buttonText="save"
    />
  );
};

export default CreateOffer;