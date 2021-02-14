import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MainSwitch from './MainSwitch';
import AppBar from './MainAppBar';
import Hidden from '@material-ui/core/Hidden';
import ContentDrawer from './ContentDrawer';



const useStyles = makeStyles((theme: Theme) => createStyles({
  appBarBuffer: theme.mixins.toolbar,
}));



const MainDisplay: React.FC = () => {

  const classes = useStyles();



  return (
    <div>
      <AppBar />
      <div className={classes.appBarBuffer}/>
      <Hidden mdUp>
        <MainSwitch />
      </Hidden>
      <Hidden smDown >
        <ContentDrawer />
      </Hidden>
    </div>
  );
};

export default MainDisplay;
