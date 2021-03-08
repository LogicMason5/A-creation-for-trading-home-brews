import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardMedia } from '@material-ui/core';

interface ImageDisplayProps {
  url: string;
}

const useStyles = makeStyles(() => createStyles({
  media: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
}));

const ImageDisplay: React.FC<ImageDisplayProps> = ({ url }) => {
  const classes = useStyles();

  return (
    url
      ? (
        <Card>
          <CardMedia
            id="imageDisplay"
            image={url}
            className={classes.media}
          />
        </Card>
      )
      : null
  );
};

export default ImageDisplay;
