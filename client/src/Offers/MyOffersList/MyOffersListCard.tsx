import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, IconButton, Typography, Divider, Grid } from '@material-ui/core';
import { IOffer } from '../../type';
import { DeleteForever, Edit, FileCopy } from '@material-ui/icons';
import { useAsyncDispatch } from '../../store';
import { confirmDeletion, confirmCopy } from '../../Navigation/displaySlice';
import { setSelectedOffer, toggleActiveStatus } from '../offerSlice';
import { useHistory } from 'react-router-dom';
import CountDown from '../../SharedComponents/CountDown';
import IsActiveSwitch from './IsActiveSwitch';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      border: 1
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    icons: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    grow: {
      flexGrow: 1,
      display: 'flex',
    },
  }),
);

const OffersListCard: React.FC<{ initOffer: IOffer }> = ({ initOffer }) => {

  const [offer, setCurOffer] = useState(initOffer);

  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const history = useHistory();

  const handleDeleteClick = () => {
    dispatch(confirmDeletion(offer));
  };

  const handleEditClick = () => {
    dispatch(setSelectedOffer(offer));
    history.push(`/my-offers/edit/${offer.id}`);
  };

  const handleCopyClick = () => {
    dispatch(confirmCopy(offer));
  };

  const handleActiveToggle = () => {
    setCurOffer({...offer, active: !offer.active});
    dispatch(toggleActiveStatus(offer, !offer.active));
  };



  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {offer.beerName}
            </Typography>
            {offer.active
            ? 
            <Typography variant="subtitle1" color="textSecondary">
              <CountDown
                created={offer.created} accuracy="minute"
              />
            </Typography>
            :
            <Typography variant="subtitle1" color="textSecondary">
              Offer is inactive
            </Typography> 
            }
          </CardContent>
          <CardActions>
            <div className={classes.icons}>
              <IconButton aria-label="editOffer" onClick={handleEditClick}>
                <Edit />
              </IconButton>
              <IconButton aria-label="copyOffer" onClick={handleCopyClick}>
                <FileCopy />
              </IconButton>
              <IconButton aria-label="deleteOffer" onClick={handleDeleteClick}>
                <DeleteForever />
              </IconButton>
              <div className={classes.grow}></div>
              <IsActiveSwitch toggle={handleActiveToggle} checked={offer.active} />
            </div>
          </CardActions>

        </div>
        <Divider />
      </Card>
    </Grid>

  );
};

export default OffersListCard;