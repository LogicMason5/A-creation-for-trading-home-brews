import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Map from '../Map/Map';
import CreateOfferForm from '../Offers/CreateOfferForm';
import OfferDisplay from '../Offers/OfferDisplay';
import { RootState } from '../rootReducer';
      
const MainSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.location.mapsLoaded
  );

  return (
    <Switch>
      <Route path="/create-offer" render={() => isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
      <Route path="/offers/:id" render={() => <OfferDisplay />} />
      <Route path="/" render={() => isLoaded ? <Map /> : <div>Loading maps...</div>} />
    </Switch>
  );
}; 

export default MainSwitch;    
        
