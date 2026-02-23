import React, { useEffect, useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

import { setMapsLoaded } from './Display/displaySlice';
import MainDisplay from './Display/MainDisplay';
import { initUser } from './User/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Memoize libraries to prevent re-creation
  const libraries = useMemo<Libraries>(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  });

  // Only dispatch when value actually changes
  useEffect(() => {
    if (isLoaded) {
      dispatch(setMapsLoaded(true));
    }
  }, [isLoaded, dispatch]);

  // Run once on mount
  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return <MainDisplay />;
};

export default App;
