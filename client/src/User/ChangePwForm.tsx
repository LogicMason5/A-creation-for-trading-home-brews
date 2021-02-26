import React, { useEffect } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import {
  Formik, FormikHelpers, FormikProps, Form, Field,
} from 'formik';
import * as yup from 'yup';
import FormTextField from '../SharedComponents/FormTextField';
import { setDrawerOpen } from '../Display/displaySlice';
import { changePw } from './userSlice';
import { useAsyncDispatch } from '../store';
import { ChangePwFormValues } from '../type';

const validationSchema = yup.object().shape({
  oldPassword: yup.string()
    .required('A password is required')
    .min(8, 'Password is too short,should be 8 characters minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  newPassword: yup.string()
    .required('A password is required')
    .min(8, 'Password is too short,should be 8 characters minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  newPasswordConfirm: yup.string()
    .required('Please confirm your password')
    .min(8, 'Password is too short, should be 8 characters minimum.')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePwForm: React.FC = () => {
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container fixed>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: ChangePwFormValues,
          formikHelpers: FormikHelpers<ChangePwFormValues>,
        ) => {
          dispatch(changePw(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<ChangePwFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  type="password"
                  name="oldPassword"
                  label="Old password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="8 characters with a number required"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="password"
                  name="newPassword"
                  label="New password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="8 characters with a number required"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="password"
                  name="newPasswordConfirm"
                  label="Confirm new password"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText=""
                />
              </Grid>
              <Grid item xs={12}>
                <Button
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

export default ChangePwForm;
