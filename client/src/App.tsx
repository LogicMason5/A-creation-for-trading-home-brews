import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { setMapsLoaded } from './Navigation/displaySlice';
import { useDispatch } from 'react-redux';
import Mobile from './Navigation/Mobile';
import Desktop from './Navigation/Desktop';
import Map from './Map/Map';
import { setCurUser } from './User/userSlice';


const libraries = ["places"] as unknown as undefined;

const App: React.FC = () => {

  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries
  });

  useEffect(() => {
    dispatch(setMapsLoaded(isLoaded));
  },[isLoaded, dispatch]);

  useEffect(() => {
    const curUser = window.localStorage.getItem('curUser');
    if (curUser) dispatch(setCurUser(JSON.parse(curUser)));
  },[dispatch]);


  return (
    <Box height="100%">
      <Hidden smDown>
        <Desktop />
        {isLoaded ? <Map /> : 'loading google maps'}
      </Hidden>
      <Hidden mdUp>
        <Mobile />
      </Hidden>
    </Box >
  );
};

export default App;
