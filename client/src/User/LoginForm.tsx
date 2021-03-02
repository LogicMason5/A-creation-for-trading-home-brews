import React, { useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  Formik, FormikHelpers, FormikProps, Form, Field,
} from 'formik';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
import FormTextField from '../SharedComponents/FormTextField';
import { setDrawerOpen } from '../Display/displaySlice';
import { login } from './userSlice';
import { LoginFormValues } from '../type';
import { useAsyncDispatch } from '../store';
import TitleBox from '../SharedComponents/TitleBox';

const validationSchema = yup.object().shape({
  email: yup.string().required('Please provide a valid email')
    .email('Please provide a valid email'),
  password: yup.string()
    .required('A password is required')
    .min(8, 'Password is too short, it should be 8 characters minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number to be valid.'),
});

const LoginForm: React.FC = () => {
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container>
      <TitleBox title="Login" />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: LoginFormValues,
          formikHelpers: FormikHelpers<LoginFormValues>,
        ) => {
          dispatch(login(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<LoginFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  id="loginEmailField"
                  name="email"
                  label="Email"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="loginPwField"
                  type="password"
                  name="password"
                  label="Password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="8 characters with a number required"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  id="loginSubmitButton"
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  fullWidth
                >
                  login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
