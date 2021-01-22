import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import { setMapsLoaded } from './Navigation/displaySlice';
import { useDispatch } from 'react-redux';
import Mobile from './Navigation/Mobile';
import Desktop from './Navigation/Desktop';
import Map from './Map/Map';


const libraries = ["places"] as unknown as undefined;

const App: React.FC = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });

  useEffect(() => {
    dispatch(setMapsLoaded(isLoaded));
  },[isLoaded, dispatch]);

  if (!isLoaded) return (<h3>Loading google maps scripts...</h3>);

  return (
    <Box>
      <Hidden smDown>
        <Desktop />
        <Map />
      </Hidden>
      <Hidden mdUp>
        <Mobile />
      </Hidden>
    </Box>
  );
};

export default App;
