import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../store';
import { fetchMyOffers } from './offerSlice';
import { RootState } from '../rootReducer';
import OffersListCard from './OffersListCard';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import Typography from '@material-ui/core/Typography';



const MyOffersList: React.FC = () => {

  const dispatch = useAsyncDispatch();

  const myOffers = useSelector(
    (state: RootState) => state.offers.myOffers
  );

  useEffect(() => {
    dispatch(fetchMyOffers());
  }, [dispatch, myOffers]); 

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <div>
      {myOffers.length > 1
      ?
      myOffers.map(o => <OffersListCard key={o.id} offer={o}  />)
      :
      <Typography
        align="center"
        variant="h4"
        style={{ lineHeight: 1.25 }}
        >
        No offers found
      </Typography>}
    </div>
  );

};

export default MyOffersList;