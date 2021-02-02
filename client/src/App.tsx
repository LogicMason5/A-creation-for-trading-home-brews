import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Box from '@material-ui/core/Box';
import { setMapsLoaded } from './SharedComponents/displaySlice';
import { useDispatch } from 'react-redux';
import MainDisplay from './Navigation/MainDisplay';
import { setLoggedUser } from './User/userSlice';
import ShowAlert from './SharedComponents/ShowAlert';
import ConfirmDialog from './SharedComponents/ConfirmDialog';


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
    <Box height="100%">
      <ConfirmDialog />
      <ShowAlert />
      <MainDisplay />
    </Box >
  );
};

export default App;
