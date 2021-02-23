import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useAsyncDispatch } from '../../store';
import { fetchMyOffers } from '../offerSlice';
import { RootState } from '../../rootReducer';
import OffersListCard from './MyOffersListCard';
import { setDrawerOpen } from '../../Navigation/displaySlice';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TitleBox from '../../SharedComponents/TitleBox';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      justify: "center",
      paddingTop: 15
    },
  }),
);

const MyOffersList: React.FC = () => {

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const myOffers = useSelector(
    (state: RootState) => state.offers.myOffers
  );

  useEffect(() => {
    dispatch(fetchMyOffers());
  }, [dispatch]); 

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <Grid 
        container
        spacing={2}
        justify="center"
      >
          {myOffers.length > 0
          ?
          myOffers.map(o => <OffersListCard key={o.id} offer={o}  />)
          :
          <div>
            <TitleBox title="No offers found."/>
            <Link to="/create-offer">
              <TitleBox title="create a new offer?" />
            </Link>
          </div>
          }

      </Grid>
    </Container>
  );

};

export default MyOffersList;