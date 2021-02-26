import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Close from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import MainSwitch from './MainSwitch';
import Map from '../Map/Map';
import { RootState } from '../rootReducer';
import { setDrawerOpen } from './displaySlice';
import history from '../utils/history';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  drawer: {
    width: 400,
    flexShrink: 0,
    [theme.breakpoints.up('lg')]: {
      width: 550,
    },
  },
  drawerPaper: {
    width: 400,
    [theme.breakpoints.up('lg')]: {
      width: 550,
    },
  },
  appBarBuffer: theme.mixins.toolbar,
}));

const SwitchInDrawer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { mapsLoaded, drawerOpen } = useSelector(
    (state: RootState) => state.display,
  );

  const handleDrawerClose = (): void => {
    dispatch(setDrawerOpen(false));
    history.push('/');
  };

  return (
    <div>
      {mapsLoaded ? <Map /> : <CircularProgress />}
      <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.appBarBuffer} />
          <MainSwitch />
          <div className={classes.grow} />
          <div className={classes.appBarBuffer}>
            <IconButton onClick={handleDrawerClose}>
              <Close style={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default SwitchInDrawer;
