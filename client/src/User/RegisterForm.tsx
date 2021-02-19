import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button, Box } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import FormTextField from "../SharedComponents/FormTextField";
import { Link } from 'react-router-dom';
import * as yup from "yup";
import Hidden from '@material-ui/core/Hidden';
import { setDrawerOpen } from '../Navigation/displaySlice';
import { createUser } from './userSlice';
import { RegisterFormValues } from '../type';
import { useAsyncDispatch } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarBuffer: theme.mixins.toolbar,
  }),
);

const validationSchema = yup.object().shape({
  displayName: yup.string()
    .required("A display name is required")
    .min(4, "Min length is 4 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can contain letters and numbers only."),
  email: yup.string().required("Please provide a valid email")
    .email("Please provide a valid email"),
  password: yup.string()
    .required("A password is required")
    .min(8, "Password is too short,should be 8 characters minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  passwordConfirm: yup.string()
    .required("Please confirm your password")
    .min(8, "Password is too short,should be 8 characters minimum.")
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegisterForm: React.FC = () => {

  const classes = useStyles();
 
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container fixed>
      <Hidden mdUp>
        <div className={classes.toolbarBuffer} />
      </Hidden>
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h6"
          style={{ lineHeight: 1.25 }}
        >
          Register a new brewer
        </Typography>
      </Box>
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          passwordConfirm: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: RegisterFormValues,
          formikHelpers: FormikHelpers<RegisterFormValues>
        ) => {
          dispatch(createUser(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<RegisterFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Field
                  name="displayName"
                  label="Public username"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="This name will be visible to other users"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Email needs to be valid for you to receive responses to your offer. It's kept private."
                />
              </Grid>
              <Grid item xs={12}>
                <Field
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
                <Field
                  type="password"
                  name="passwordConfirm"
                  label="Confirm password"
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
      <Box mb={1} p={5}>
        <Typography
          align="center"
          variant="h6"
          style={{ lineHeight: 1.25 }}
        >
          Already registered?
        </Typography>
      </Box>
      <Grid container  spacing={2} >
        <Grid item xs={12}>
          <Link to="/login">
            <Button
                variant="outlined"
                size="large"
                color="primary"
                fullWidth
                >
                Sign in
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;