import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MyLocation from '@material-ui/icons/MyLocation';
import { useGoogleMap } from '@react-google-maps/api';
import { Coordinates } from '../type';

const useStyles = makeStyles((theme) => ({
  locateButton: {
    position: 'fixed',
    bottom: theme.spacing(3.5),
    right: theme.spacing(1.5),
  },
}));

const LocateButton: React.FC = () => {
  const classes = useStyles();

  const map = useGoogleMap();

  const panTo = useCallback((coords: Coordinates) => {
    map?.panTo(coords);
    map?.setZoom(12);
  }, [map]);

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      // success function
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      // fail function
      () => null,
    );
  };

  return (
    <Fab color="primary" size="medium" className={classes.locateButton} onClick={handleClick}>
      <MyLocation fontSize="large" />
    </Fab>
  );
};

export default LocateButton;
