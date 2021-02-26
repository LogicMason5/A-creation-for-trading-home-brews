import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import TitleBox from '../SharedComponents/TitleBox';
import LoginForm from './LoginForm';
import ReqResetPwForm from './ReqResetPwForm';

const useStyles = makeStyles(() => createStyles({
  toBottom: {
    position: 'relative',
    align: 'bottom',
  },
}));

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <LoginForm />
      <ReqResetPwForm />
      <Container className={classes.toBottom}>
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
    </div>
  );
};

export default LoginPage;
