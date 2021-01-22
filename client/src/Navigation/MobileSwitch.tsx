import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Map from '../Map/Map';
import { RootState } from '../rootReducer';
import MainSwitch from './MainSwitch';
      
const MobileSwitch: React.FC = () => {

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  if (!isLoaded) return null;

  return (
    <div>
      <MainSwitch />
      <Switch>
        <Route path="/" render={() => <Map />} />
      </Switch>
    </div>
  );
}; 

export default MobileSwitch;    
        
