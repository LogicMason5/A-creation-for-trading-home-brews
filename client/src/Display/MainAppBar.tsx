import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Hidden } from '@material-ui/core';
import {
  Help, AccountCircle, AddLocation, Menu,
} from '@material-ui/icons';
import { setDrawerOpen } from './displaySlice';
import black from '../assets/black.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    flex: 0,
  },
}));

const MainAppBar: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

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
        <Typography variant="h5" noWrap>
          Homebrew Swap
        </Typography>
        <Hidden xsDown>
          <div className={classes.grow} />
          <div>
            <IconButton
              id="createOfferAppBarButton"
              aria-label="create-offer"
              color="inherit"
              component={Link}
              to="/create-offer"
            >
              <AddLocation />
            </IconButton>
            <IconButton
              id="FAQAppBarButton"
              aria-label="faq"
              color="inherit"
              component={Link}
              to="/FAQ"
            >
              <Help />
            </IconButton>
            <IconButton
              id="myAccountAppBarButton"
              edge="end"
              color="inherit"
              component={Link}
              to="/my-account"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={classes.grow} />
          <IconButton
            aria-label="create-offer"
            color="inherit"
            component={Link}
            to="/mobile-menu"
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
