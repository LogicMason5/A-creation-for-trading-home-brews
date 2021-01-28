import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchOfferById } from './offerSlice';
import { setDrawerOpen } from '../Navigation/displaySlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    toolbarBuffer: theme.mixins.toolbar,
  }),
);

interface MatchParams {
  id: string
}



const OfferDisplay: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const match = useRouteMatch<MatchParams>('/offers/:id');

  const id = match?.params.id;

  const offer = useSelector(
    (state: RootState) => state.offers.displayedOffer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id.toString()));
    }
  }, [dispatch, id]);

  useEffect(() => {
      dispatch(setDrawerOpen(true));
  }, [dispatch]);


  if (!offer) return (
    <div>loading offer...</div>
  );

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (offer.recipeLink) window.open(`//${offer.recipeLink}`, `_blank`);
  };


  return (
    <Paper className={classes.root}>
      <Hidden mdUp>
        <div className={classes.toolbarBuffer} />
      </Hidden>
      <CardHeader
        title={offer.beerName}
      />
      <Divider />
      <CardMedia
        className={classes.media}
        image={'https://images.ctfassets.net/sz2xpiwl6od9/ViVjIh4AALgAXfA2/86ce8853610527d1438c72220bc13533/bb19ca64bcd7dba6922d8a0fac623ff81fed831f_sours-primer.jpg?w=1600&fm=webp'}
        title="placeholder image"
      />
      <Divider />
      <CardContent>
      <Typography color="textSecondary" component="p">
          Description:
      </Typography>
      <Typography color="textPrimary" component="p">
          {offer.description}
      </Typography>
      {offer.amount ?
      <div> 
        <Typography color="textSecondary" component="p">
            Amount offered:
        </Typography>
        <Typography color="textPrimary" component="p">
            {offer.amount}
        </Typography>
      </div>
      : null}
      {offer.packageSize ?
      <div> 
        <Typography color="textSecondary" component="p">
            Package size:
        </Typography>
        <Typography color="textPrimary" component="p">
            {offer.packageSize}
        </Typography>
      </div>
      :
      null
      }
      {offer.recipeLink ?
      <div> 
        <Typography color="textSecondary" component="p">
            Url to recipe/brewing notes:
        </Typography>
        <Link href={offer.recipeLink} onClick={handleLinkClick} component="p">
            {offer.recipeLink}
        </Link>
      </div>
      : null}
      <div> 
        <Typography color="textSecondary" component="p">
          Offer expires in:
        </Typography>
        <Typography  color="textPrimary" component="p"> 
          time created {offer.created}
        </Typography>
      </div>
      </CardContent>
      <CardActions>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        fullWidth
      >
        Message the brewer
      </Button>
      </CardActions>
    </Paper>
  );
};

export default OfferDisplay;