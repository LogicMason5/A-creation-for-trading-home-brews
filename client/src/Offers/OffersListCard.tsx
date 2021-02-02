import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IOffer } from '../type';
import Divider from '@material-ui/core/Divider';
import { DeleteForever, Edit, FileCopy } from '@material-ui/icons';
import { useAsyncDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ListCardRoot: {
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
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

const OffersListCard: React.FC<{ offer: IOffer }> = ({ offer }) => {
  const classes = useStyles();

  const dispatch = useAsyncDispatch();

  const onDeleteClick = () => {
    dispatch()
  };

  return (
    <Card className={classes.ListCardRoot}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {offer.beerName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {offer.created}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            <Edit />
          </IconButton>
          <IconButton aria-label="play/pause">
            <FileCopy />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDeleteClick}>
            <DeleteForever />
          </IconButton>
        </div>
      </div>
      <Divider />
    </Card>

  );
};

export default OffersListCard;