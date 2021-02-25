import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Box from '@material-ui/core/Box';
import { setMapsLoaded } from './Navigation/displaySlice';
import { useDispatch } from 'react-redux';
import MainDisplay from './Navigation/MainDisplay';
import ShowAlert from './SharedComponents/ShowAlert';
import DeleteOfferDialog from './Offers/OfferDialogs';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { initUser } from './User/userSlice';


const libraries = ["places"] as Libraries;

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
    dispatch(initUser());
  },[dispatch]);


  return (
    <Box>
      <DeleteOfferDialog />
      <ShowAlert />
      <MainDisplay />
    </Box>
  );
};

export default App;
