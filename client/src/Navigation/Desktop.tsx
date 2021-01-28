import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MainSwitch from './MainSwitch';
import Close from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { setDrawerOpen } from './displaySlice';
import DesktopAppBar from './DesktopAppBar';


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
  drawerBuffer: theme.mixins.toolbar,
}));

const Desktop: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const open = useSelector(
    (state: RootState) => state.display.drawerOpen
  );

  const handleDrawerClose = (): void => {
    dispatch(setDrawerOpen(false));
  };

  return (
    <div>
      <DesktopAppBar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerBuffer}/>
        <MainSwitch />
        <div className={classes.grow} />
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <Close style={{ fontSize: 60 }} />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};

export default Desktop;
