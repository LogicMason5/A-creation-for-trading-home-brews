import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import CreateOffer from '../Offers/OfferForms/CreateOffer';
import OfferDisplay from '../Offers/OfferDisplay';
import Map from '../Map/Map';
import { RootState } from '../rootReducer';
import RegisterForm from '../User/RegisterForm';
import LoginForm from '../User/LoginForm';
import MyAccount from './MyAccount';
import MobileMenu from './MobileMenu';
import MyOffersList from '../Offers/MyOffersList/MyOffersList';
import EditOffer from '../Offers/OfferForms/EditOffer';
import CopyOffer from '../Offers/OfferForms/CopyOffer';
import FAQ from './FAQ';
import { CircularProgress } from '@material-ui/core';


const MainSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  const ref = useRef(null); // this fixed drawer re-rendering, why?

  return (
    <div ref={ref}>
      <Switch >
        <Route path="/create-offer" render={() =>  isLoaded ? <CreateOffer /> : <CircularProgress />} />
        <Route path="/my-offers/edit/:id" render={() => <EditOffer />} />
        <Route path="/my-offers/copy/:id" render={() => <CopyOffer />} />
        <Route path="/offers/:id" render={() => <OfferDisplay />} />
        <Route path="/register" render={() => <RegisterForm />} />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/my-account" render={() => <MyAccount />} />
        <Route path="/mobile-menu" render={() => <MobileMenu />} />
        <Route path="/my-offers" render={() => <MyOffersList />} />
        <Route path="/FAQ" render={() => <FAQ />} />
        <Route path="/" render={() => isLoaded ? <Map /> : <CircularProgress />} />
      </Switch>
    </div>

  );
}; 

export default MainSwitch;    
        
