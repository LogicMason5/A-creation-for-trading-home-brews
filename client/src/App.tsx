import React from 'react';
// import CreateOfferForm from './Offers/CreateOfferForm';
// import OfferDisplay from './Offers/OfferDisplay';
import { useLoadScript } from '@react-google-maps/api';
// import Map from './Map/Map';
import Main from './Navigation/Main';
import Box from '@material-ui/core/Box';
// import { Switch, Route } from "react-router-dom";
import { setMapsLoaded } from './Map/locationSlice';
import { useDispatch } from 'react-redux';
import MainSwitch from './Navigation/MainSwitch';

const libraries = ["places"] as unknown as undefined;

const App: React.FC = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });

  dispatch(setMapsLoaded(isLoaded));

  return (
    <Box>
      <Main />
      {/* <Switch>
        <Route path="/create-offer" render={() => isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
        <Route path="/offers/:id" render={() => <OfferDisplay />} />
        <Route path="/" render={() => isLoaded ? <Map /> : <div>Loading maps...</div>} />
      </Switch> */}
      <MainSwitch />
    </Box>
  );
};

  export default App;
