import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OfferFormValues } from '../../type';
import EditOfferForm from './OfferForm';
import { createOffer } from '../offerSlice';
import { RootState } from '../../rootReducer';
import { setOfferUploadUrl } from '../../Display/displaySlice';

const CopyOffer: React.FC = () => {
  const dispatch = useDispatch();

  const selectedOffer = useSelector(
    (state: RootState) => state.offers.selectedOffer,
  );

  const copiedOfferValues: OfferFormValues = {
    beerName: selectedOffer.beerName,
    description: selectedOffer.description,
    packageSize: selectedOffer.packageSize ? selectedOffer.packageSize : '',
    amount: selectedOffer.amount ? selectedOffer.amount : 2,
    location: '',
    recipeLink: selectedOffer.recipeLink ? selectedOffer.recipeLink : '',
  };

  useEffect(() => {
    dispatch(setOfferUploadUrl(selectedOffer.imgUrl));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditOfferForm
      formTitle={`Creating a new offer from a copy of ${selectedOffer.beerName}`}
      initValues={copiedOfferValues}
      actionOnSubmit={createOffer}
      buttonText="save as new"
    />
  );
};

export default CopyOffer;
