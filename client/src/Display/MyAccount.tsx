import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../rootReducer';
import AccountMenu from './DesktopMenu';

const MyAccount: React.FC = () => {
  const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    loggedIn
      ? <AccountMenu />
      : <Redirect to="/login" />
  );
};

export default MyAccount;
