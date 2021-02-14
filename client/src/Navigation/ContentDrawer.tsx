import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MainSwitch from './MainSwitch';
import Map from '../Map/Map';
import Close from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { setDrawerOpen } from './displaySlice';
import history from '../utils/history';



const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth + 150
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth + 150
    },
  },
  appBarBuffer: theme.mixins.toolbar,
}));



const ContentDrawer: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { mapsLoaded, drawerOpen } = useSelector(
    (state: RootState) => state.display
  );

  const handleDrawerClose = (): void => {
    dispatch(setDrawerOpen(false));
    history.push('/');
  };

  return (
    <div>
      {mapsLoaded ? <Map /> : <div>loading google maps</div>}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.appBarBuffer}/>
        <MainSwitch />
        <div className={classes.grow} />
        <div className={classes.appBarBuffer} style={{ minHeight: 90 }}/>
        <div style={{ height: 90 }} >
          <IconButton onClick={handleDrawerClose}>
            <Close style={{ fontSize: 60 }} />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};



export default ContentDrawer;