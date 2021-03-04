import React, { useEffect } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import {
  Formik, FormikHelpers, FormikProps, Form, Field,
} from 'formik';
import { useRouteMatch } from 'react-router-dom';
import * as yup from 'yup';
import FormTextField from '../SharedComponents/FormTextField';
import { setDrawerOpen } from '../Display/displaySlice';
import { resetPw } from './userSlice';
import { ResetPwFormValues } from '../type';
import { useAsyncDispatch } from '../store';
import TitleBox from '../SharedComponents/TitleBox';

const validationSchema = yup.object().shape({
  password: yup.string()
    .required('A password is required')
    .min(8, 'Password is too short,should be 8 characters minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  passwordConfirm: yup.string()
    .required('Please confirm your password')
    .min(8, 'Password is too short,should be 8 characters minimum.')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

interface MatchParams {
  token: string
}

const ResetPw: React.FC = () => {
  const dispatch = useAsyncDispatch();

  const match = useRouteMatch<MatchParams>('/resetpw/:token');

  const tempToken = match ? match.params.token : '';

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container fixed>
      <TitleBox title="Reset password" />
      <Formik
        initialValues={{
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: ResetPwFormValues,
          formikHelpers: FormikHelpers<ResetPwFormValues>,
        ) => {
          dispatch(resetPw(values, tempToken));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<ResetPwFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  id="resetPwNewPwField"
                  type="password"
                  name="password"
                  label="New password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="8 characters with a number required"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="resetPwConfirmPwField"
                  type="password"
                  name="passwordConfirm"
                  label="Confirm new password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText=""
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  id="resetPwSubmitButton"
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPw;
