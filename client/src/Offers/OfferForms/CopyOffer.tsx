import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import EditOfferForm from './OfferForm';
import { createOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import { setOfferUploadUrl } from '../../Display/displaySlice';
import { setLocation } from '../../Map/locationSlice';

const CopyOffer: React.FC = () => {
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
    <EditOfferForm
      formTitle={`Creating a new offer from a copy of ${beerName}`}
      initValues={copiedOfferValues}
      actionOnSubmit={createOffer}
      buttonText="save as new"
    />
  );
};

export default CopyOffer;
