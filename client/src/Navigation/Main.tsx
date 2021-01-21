import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import ContentDrawer from './ContentDrawer';
import Grid from '@material-ui/core/Grid';
// import { Switch, Route } from "react-router-dom";
// import CreateOfferForm from '../Offers/CreateOfferForm';
// import OfferDisplay from '../Offers/OfferDisplay';
// import Map from '../Map/Map';
import Box from '@material-ui/core/Box';




const useStyles = makeStyles((theme: Theme) => createStyles({

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },

}));


const Main: React.FC = () => {

  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.sectionDesktop}>
          <DesktopHeader />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >

          </Grid>
          <ContentDrawer >

          </ContentDrawer>

      </Box>
      <div >
        <Box className={classes.sectionMobile}>
          <MobileHeader />

        </Box>
      </div>
    </Box>



  );
};

export default Main;
