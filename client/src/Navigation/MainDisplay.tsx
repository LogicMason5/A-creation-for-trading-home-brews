import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MainSwitch from './MainSwitch';
import Map from '../Map/Map';
import Close from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import AppBar from './AppBar';
import Hidden from '@material-ui/core/Hidden';
import history from '../utils/history';


const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) => createStyles({

  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBarBuffer: theme.mixins.toolbar,
}));

const MainDisplay: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const open = useSelector(
    (state: RootState) => state.display.drawerOpen
  );

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  const handleDrawerClose = (): void => {
    dispatch(setDrawerOpen(false));
    history.push('/');
  };

  return (
    <div>
      <AppBar />
      <div className={classes.appBarBuffer}/>
      <Hidden mdUp>
        <MainSwitch />
      </Hidden>
      <Hidden smDown>
        {isLoaded ? <Map /> : <div>loading google maps</div>}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.appBarBuffer}/>
          <MainSwitch />
          <div className={classes.grow} />
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <Close style={{ fontSize: 60 }} />
            </IconButton>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
};

export default MainDisplay;
