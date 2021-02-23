import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AccountBox, AddLocation, ExitToApp, LocalOffer } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../User/userSlice';
import MenuListItem from '../SharedComponents/MenuListItem';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const IsLoggedOptions: React.FC = () => {

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
        <div className={classes.root}>
          <MenuListItem
            itemText="Create an offer"
            linkTo="/create-offer"
            icon={<AddLocation />}
          />
          <MenuListItem
            itemText="My Offers"
            linkTo="/my-offers"
            icon={<LocalOffer />}
          />
          <MenuListItem
            itemText="Edit account"
            linkTo="/edit-account"
            icon={<AccountBox />}
          />
          <MenuListItem
            itemText="Log out"
            linkTo="/login"
            onClick={handleLogout}
            icon={<ExitToApp />}
          />
        </div>
  );
};

export default IsLoggedOptions;