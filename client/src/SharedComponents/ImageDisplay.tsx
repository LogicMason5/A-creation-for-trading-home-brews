import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { Card, CardMedia } from '@material-ui/core';
import { Image } from '@material-ui/icons';

const useStyles = makeStyles(() =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '100%', // 1:1
    },
  }),
);



const ImageDisplay: React.FC = () => {

  const classes = useStyles();

  const url = useSelector(
    (state: RootState) => state.display.offerUploadUrl
  );


  return (
    url
    ?
    <Card>
          <CardMedia
            image={url}
            className={classes.media}
          />
    </Card>
    :
    <Image />
  );
};

export default ImageDisplay;