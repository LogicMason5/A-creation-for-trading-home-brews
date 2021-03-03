import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { setMapsLoaded } from './Display/displaySlice';
import MainDisplay from './Display/MainDisplay';
import { initUser } from './User/userSlice';

const libraries = ['places'] as Libraries;

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    dispatch(setMapsLoaded(isLoaded));
  }, [isLoaded, dispatch]);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <MainDisplay />
  );
};

export default App;
