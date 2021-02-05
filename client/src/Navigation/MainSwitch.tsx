/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import CreateOffer from '../Offers/CreateOffer';
import OfferDisplay from '../Offers/OfferDisplay';
import Map from '../Map/Map';
import { RootState } from '../rootReducer';
import RegisterForm from '../User/RegisterForm';
import LoginForm from '../User/LoginForm';
import MyAccount from './MyAccount';
import MobileMenu from './MobileMenu';
import MyOffersList from '../Offers/MyOffersList';
import EditOffer from '../Offers/EditOffer';


const MainSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  return (
    
    <Switch>
      <Route path="/create-offer" render={() =>  isLoaded ? <CreateOffer /> : <div>Loading maps...</div>} />
      <Route path="/offers/edit/:id" render={() => <EditOffer />} />
      <Route path="/offers/:id" render={() => <OfferDisplay />} />
      <Route path="/register" render={() => <RegisterForm />} />
      <Route path="/login" render={() => <LoginForm />} />
      <Route path="/my-account" render={() => <MyAccount />} />
      <Route path="/mobile-menu" render={() => <MobileMenu />} />
      <Route path="/my-offers" render={() => <MyOffersList />} />
      <Route path="/" render={() => isLoaded ? <Map /> : <div>Loading maps...</div>} />
    </Switch>

  );
}; 

export default MainSwitch;    
        
