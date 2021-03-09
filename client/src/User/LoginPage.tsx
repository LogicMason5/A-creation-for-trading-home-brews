import { Button, Container } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import TitleBox from '../SharedComponents/TitleBox';
import LoginForm from './LoginForm';
import ReqResetPwForm from './ReqResetPwForm';

const LoginPage: React.FC = () => (
  <>
    <LoginForm />
    <ReqResetPwForm />
    <Container>
      <TitleBox title="Not yet registered?" />
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
        >
          Register
        </Button>
      </Link>
    </Container>
  </>
);

export default LoginPage;
