import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IOffer } from '../../type';
import Divider from '@material-ui/core/Divider';
import { DeleteForever, Edit, FileCopy } from '@material-ui/icons';
import { useAsyncDispatch } from '../../store';
import { confirmDeletion, confirmCopy } from '../../Navigation/displaySlice';
import { setSelectedOffer } from '../offerSlice';
import { useHistory } from 'react-router-dom';
import CountDown from '../../SharedComponents/CountDown';
import { CountdownRendererFn, CountdownRenderProps } from 'react-countdown';
import Grid from '@material-ui/core/Grid';
import IsActiveSwitch from './IsActiveSwitch';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listCardRoot: {
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
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    grow: {
      flexGrow: 1,
      display: 'flex',
    },
  }),
);

const OffersListCard: React.FC<{ offer: IOffer }> = ({ offer }) => {

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

  const countdownFormatter: CountdownRendererFn = (props: CountdownRenderProps) => {
    return (
      <span>
      Expires in {props.days} days, {props.hours} hours and {props.minutes} minutes
      </span>
    );
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.listCardRoot}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {offer.beerName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <CountDown
                created={offer.created} renderer={countdownFormatter}/>
            </Typography>
          </CardContent>
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
            <IsActiveSwitch offer={offer} />
          </div>
        </div>
        <Divider />
      </Card>
    </Grid>

  );
};

export default OffersListCard;