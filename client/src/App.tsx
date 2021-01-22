import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Switch, Route } from "react-router-dom";
import { setDrawerOpen, setMapsLoaded } from './Navigation/displaySlice';
import { useDispatch, useSelector } from 'react-redux';
import Mobile from './Navigation/Mobile';
import Desktop from './Navigation/Desktop';
import Map from './Map/Map';


const libraries = ["places"] as unknown as undefined;

const useStyles = makeStyles((theme: Theme) => createStyles({

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },

}));

const App: React.FC = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const classes = useStyles();

  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });

  useEffect(() => {
    dispatch(setMapsLoaded(isLoaded));
  },[isLoaded, dispatch]);

  useEffect(() => {
    dispatch(setDrawerOpen(window.location.pathname === '/'));
  },[dispatch]);

  if (!isLoaded) return (<h3>Loading google maps scripts...</h3>);

  return (
    <Box>
      <Box className={classes.sectionDesktop}>
        <Desktop />
      </Box>
      <Box className={classes.sectionMobile}>
        <Mobile />
      </Box>
      <Switch>
        <Route path="/" render={() => <Map />} />
      </Switch>
    </Box>
  );
};

  export default App;
