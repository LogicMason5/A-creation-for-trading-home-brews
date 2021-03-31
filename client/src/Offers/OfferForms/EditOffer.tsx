import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import OfferForm from './OfferForm';
import { updateSelectedOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import { setOfferUploadUrl } from '../../Display/displaySlice';
import { setLocation } from '../../Map/locationSlice';

const EditOffer: React.FC = () => {
  const dispatch = useDispatch();

  const {
    beerName, description, packageSize, amount, location, recipeLink, reviewLink, imgUrl,
  } = useSelector(
    (state: RootState) => state.offers.selectedOffer,
  );

  const copiedOfferValues: OfferFormValues = {
    beerName,
    description,
    packageSize: packageSize || '',
    amount: amount || 2,
    location: location.asText ? location.asText : '',
    recipeLink: recipeLink || '',
    reviewLink: reviewLink || '',
  };

  useEffect(() => {
    dispatch(setOfferUploadUrl(imgUrl));
    dispatch(setLocation(location));
  }, []);

  return (
    <OfferForm
      formTitle={`Editing offer for ${beerName}`}
      initValues={copiedOfferValues}
      actionOnSubmit={updateSelectedOffer}
      buttonText="save"
    />
  );
};

export default EditOffer;
