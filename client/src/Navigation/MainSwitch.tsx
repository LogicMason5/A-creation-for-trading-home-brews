import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import CreateOfferForm from '../Offers/CreateOfferForm';
import OfferDisplay from '../Offers/OfferDisplay';
import { RootState } from '../rootReducer';
      
const MainSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  if (!isLoaded) return null;

  return (
    <Switch>
      <Route path="/create-offer" render={() =>  isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
      <Route path="/offers/:id" render={() => <OfferDisplay />} />
    </Switch>
  );
}; 

export default MainSwitch;    
        
