import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  CardContent, Typography, Link, Divider, Container, CircularProgress,
} from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchOfferById } from './offerSlice';
import { setDrawerOpen, setShowMessageForm } from '../Display/displaySlice';
import CountDown from '../SharedComponents/CountDown';
import MessageForm from './MessageForm';
import ImageDisplay from '../SharedComponents/ImageDisplay';
import TitleBox from '../SharedComponents/TitleBox';
import DisplayTextItem from '../SharedComponents/DisplayTextItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
  displayOfferContainer: {
    height: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const OfferDisplay: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const match = useRouteMatch<{ id: string }>('/offers/:id');

  const id = match?.params.id;

  const offer = useSelector(
    (state: RootState) => state.offers.displayedOffer,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id.toString()));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
      dispatch(setShowMessageForm(false));
    };
  }, [dispatch, id]);

  if (!offer) return <CircularProgress />;

  const handleRecipeLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (offer.recipeLink) window.open(`//${offer.recipeLink}`, '_blank');
  };

  const handleReviewLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (offer.reviewLink) window.open(`//${offer.reviewLink}`, '_blank');
  };

  return (
    <Container className={classes.displayOfferContainer}>
      <TitleBox title={offer.beerName} />
      <ImageDisplay url={offer.imgUrl} />
      <Divider />
      <CardContent>
        <DisplayTextItem
          title="Description:"
          content={offer.description}
        />
        {offer.amount
          ? (
            <DisplayTextItem
              title="Amount offered:"
              content={offer.amount.toString()}
            />
          )
          : null}
        {offer.packageSize
          ? (
            <DisplayTextItem
              title="Package size:"
              content={offer.packageSize.toString()}
            />
          )
          : null}
        {offer.recipeLink
          ? (
            <>
              <Typography color="textSecondary" component="p">
                Url to recipe/brewing notes:
              </Typography>
              <Link href={offer.recipeLink} onClick={handleRecipeLinkClick} component="p">
                {offer.recipeLink}
              </Link>
            </>
          )
          : null}
        {offer.reviewLink
          ? (
            <>
              <Typography color="textSecondary" component="p">
                Url to review/untappd:
              </Typography>
              <Link href={offer.reviewLink} onClick={handleReviewLinkClick} component="p">
                {offer.reviewLink}
              </Link>
            </>
          )
          : null}

        {offer.created
          ? (
            <>
              <Typography color="textSecondary" component="p">
                Offer expires in:
              </Typography>
              <Typography color="textPrimary" component="p">
                <CountDown
                  created={offer.created}
                  accuracy="minute"
                />
              </Typography>
            </>
          )
          : <CircularProgress />}

        <DisplayTextItem
          title="Brewer:"
          content={offer.owner.username}
        />
      </CardContent>
      <MessageForm />
    </Container>
  );
};

export default OfferDisplay;
