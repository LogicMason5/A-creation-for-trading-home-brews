import React from 'react';
import { fade, makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddLocation from '@material-ui/icons/AddLocation';
import { Link } from 'react-router-dom';
import black from '../assets/black.png';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from './displaySlice';
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(2),
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
}));



const DesktopAppBar: React.FC = () => {

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
      <Hidden smDown>
        <Typography variant="h6" noWrap>
          Homerew Swap
        </Typography>
      </Hidden>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
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

export default DesktopAppBar;

