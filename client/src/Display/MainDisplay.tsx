import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Cookies from './Cookies';
import MainSwitch from './MainSwitch';
import AppBar from './MainAppBar';
import SwitchInDrawer from './DesktopSwitch';
import OfferDialogs from '../Offers/OfferDialogs';
import ShowAlert from '../SharedComponents/ShowAlert';

const MainDisplay: React.FC = () => (
  <div style={{ height: 'inherit', display: 'flex', flexDirection: 'column' }} id="mainDisplayContainer">
    <AppBar />
    <Hidden mdUp>
      <MainSwitch />
    </Hidden>
    <Hidden smDown>
      <SwitchInDrawer />
    </Hidden>
    <OfferDialogs />
    <ShowAlert />
    <Cookies />
  </div>
);

export default MainDisplay;
