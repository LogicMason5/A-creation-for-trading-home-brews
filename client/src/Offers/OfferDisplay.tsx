import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Route from 'react-router-dom'
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
    },
    media: {
      height: 140,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);



const OfferDisplay = () => {
  const classes = useStyles();

  const { offers } = useSelector(
    (state: RootState) => state.offers
  )
  
  const offer = offers[0]

  const preventDefault = (event: React.MouseEvent) => {
    event.preventDefault()
    window.open(`//${offer.recipeLink}`, `_blank`)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="close">
            <Close />
          </IconButton>
        }
        title={offer.beerName}
        // subheader={offer.created}
      />
      <CardMedia
        className={classes.media}
        image="/static/media/beer.f5aa4b22.svg"
        title="Paella dish"
      />
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
      :
      null
      }
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
        <Link href={offer.recipeLink} onClick={preventDefault} component="p">
            {offer.recipeLink}
        </Link>
      </div>
      :
      null
      }

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
    </Card>
  );
}

export default OfferDisplay