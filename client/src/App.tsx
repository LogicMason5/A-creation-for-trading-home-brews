import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Box from '@material-ui/core/Box';
import { setMapsLoaded } from './Navigation/displaySlice';
import { useDispatch } from 'react-redux';
import MainDisplay from './Navigation/MainDisplay';
import { setLoggedUser } from './User/userSlice';
import ShowAlert from './SharedComponents/ShowAlert';
import DeleteOfferDialog from './Offers/OfferDialogs';


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
    if (curUser) dispatch(setLoggedUser(JSON.parse(curUser)));
  },[dispatch]);


  return (
    <Box>
      <DeleteOfferDialog />
      <ShowAlert />
      <MainDisplay />
    </Box >
  );
};

export default App;
