import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
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
    <div className={classes.grow}>
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
