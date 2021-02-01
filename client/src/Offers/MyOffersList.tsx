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
    // myOffers ?
    // (<div>
    // {myOffers[0].beerName}
    // </div>)
    // :
    (<div>
    no offers  
    </div>)
  );

};

export default MyOffersList;