import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { setDrawerOpen } from '../Display/displaySlice';
import { useAsyncDispatch } from '../store';
import TitleBox from '../SharedComponents/TitleBox';
import ChangePwForm from './ChangePwForm';

const EditAccount: React.FC = () => {
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
  }, [dispatch]);

  return (
    <Container fixed>
      <TitleBox title="Update account" />
      <ChangePwForm />
    </Container>
  );
};

export default EditAccount;
