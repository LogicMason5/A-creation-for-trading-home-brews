import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import CreateOfferForm from '../Offers/CreateOfferForm';
import OfferDisplay from '../Offers/OfferDisplay';
import Map from '../Map/Map';
import { RootState } from '../rootReducer';
import RegisterForm from '../User/RegisterForm';
import LoginForm from '../User/LoginForm';
import MyAccount from '../User/MyAccount';
import Hidden from '@material-ui/core/Hidden';
import MobileMenu from './MobileMenu';
import MyOffersList from '../Offers/MyOffersList';



const MainSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  return (
    <Switch>
      <Route path="/create-offer" render={() =>  isLoaded ? <CreateOfferForm /> : <div>Loading maps...</div>} />
      <Route path="/offers/:id" render={() => <OfferDisplay />} />
      <Route path="/register" render={() => <RegisterForm />} />
      <Route path="/login" render={() => <LoginForm />} />
      <Route path="/my-account" render={() => <MyAccount />} />
      <Route path="/mobile-menu" render={() => <MobileMenu />} />
      <Route path="/my-offers" render={() => <MyOffersList />} />
      <Hidden mdUp>
        <Route path="/" render={() => isLoaded ? <Map /> : <div>Loading maps...</div>} />
      </Hidden>
    </Switch>
  );
}; 

export default MainSwitch;    
        
