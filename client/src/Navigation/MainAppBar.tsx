import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddLocation from '@material-ui/icons/AddLocation';
import { Link } from 'react-router-dom';
import black from '../assets/black.png';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from '../SharedComponents/displaySlice';
import { Hidden } from '@material-ui/core';
import { Menu } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) => createStyles({


  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
  },
}));



const MainAppBar: React.FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleDrawerOpen = (): void => {
    dispatch(setDrawerOpen(true));
  };

  const handleDrawerClose = (): void => {
    dispatch(setDrawerOpen(false));
  };

  return (
    <AppBar 
    className={classes.appBar}   
  >
    <Toolbar>
      <IconButton
        component={Link}
        to="/"
        className="homeButton"
        color="inherit"
        edge="start"
        onClick={handleDrawerClose}
      >
        <img src={black} alt="homeButton" height="40px" />
      </IconButton>
        <Typography variant="h6" noWrap>
          Homebrew Swap
        </Typography>
        <Hidden xsDown>
        <div className={classes.grow} />
        <div>
          <IconButton
            aria-label="create-offer"
            color="inherit"
            component={Link}
            to="/create-offer"
            onClick={handleDrawerOpen}
          >
            <AddLocation />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            component={Link}
            to="/my-account"
            onClick={handleDrawerOpen}
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.grow}/>
        <IconButton
            aria-label="create-offer"
            color="inherit"
            component={Link}
            to="/mobile-menu"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
  );

};

export default MainAppBar;

