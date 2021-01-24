import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Box, Paper, Grow } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import FormTextField from "../SharedComponents/FormTextField";
import { Link } from 'react-router-dom';
import * as yup from "yup";
import Hidden from '@material-ui/core/Hidden';
import { setDrawerOpen } from '../Navigation/displaySlice';
// import { login } from './userSlice';
import { LoginFormValues } from '../type';
import { useAppDispatch } from '../store';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarBuffer: theme.mixins.toolbar,
  }),
);

const validationSchema = yup.object().shape({
  email: yup.string().required("Please provide a valid email")
    .email("Please provide a valid email"),
  password: yup.string()
    .required("A password is required")
    .min(8, "Password is too short, should be 8 characters minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number to be valid.")
});

const LoginForm: React.FC = () => {

  const classes = useStyles();
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDrawerOpen(true));
}, [dispatch]);

  return (
    <Container>
      <Hidden mdUp>
        <div className={classes.toolbarBuffer} />
      </Hidden>
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h6"
          style={{ lineHeight: 1.25 }}
        >
          Login
        </Typography>
      </Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: LoginFormValues,
          formikHelpers: FormikHelpers<LoginFormValues>
        ) => {
          console.log(values);
          // dispatch(login(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<LoginFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
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
            <Grid container  spacing={2} >
              <Grid item xs={12}>
                <Typography
                  align="center"
                  variant="h6"
                  style={{ lineHeight: 1.25 }}
                >
                  Not yet registered?
                </Typography>
              </Grid>
              <Grid item xs={12} justify="flex-end">
                <Link to="/register">
                  <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      disabled={formikProps.isSubmitting}
                      fullWidth
                      >
                      Register
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;