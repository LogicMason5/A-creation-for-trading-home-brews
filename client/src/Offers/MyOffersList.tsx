import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../store';
import { fetchMyOffers } from './offerSlice';
import { RootState } from '../rootReducer';






const MyOffersList: React.FC = () => {

  const dispatch = useAsyncDispatch();

  const myOffers = useSelector(
    (state: RootState) => state.offers.myOffers
  );

  useEffect(() => {
    dispatch(fetchMyOffers());
  }, [dispatch]); 

  return (
    <div>
      
    </div>
  );

};

export default MyOffersList;