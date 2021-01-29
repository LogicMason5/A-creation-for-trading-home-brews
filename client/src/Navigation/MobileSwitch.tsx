import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router";
import Map from '../Map/Map';
import CreateOfferForm from '../Offers/CreateOfferForm';
import OfferDisplay from '../Offers/OfferDisplay';
import { RootState } from '../rootReducer';
import RegisterForm from '../User/RegisterForm';
import LoginForm from '../User/LoginForm';
import MyAccount from '../User/MyAccount';
import AccountMenu from '../User/AccountMenu';
      
const MobileSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  if (!isLoaded) return null;

  return (
      <Switch>
        <Route path="/create-offer" render={() =>  isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
        <Route path="/offers/:id" render={() => <OfferDisplay />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/my-account" render={() => <MyAccount />} />
        <Route path="/" render={() => <Map />} />
      </Switch>
  );
}; 

export default MobileSwitch;    
        
