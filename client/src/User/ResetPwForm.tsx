import React, { useState } from 'react';
import { Grid, Button } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import FormTextField from "../SharedComponents/FormTextField";
import * as yup from "yup";
import { resetPw } from './userSlice';
import { useAsyncDispatch } from '../store';
import Container from '@material-ui/core/Container';
import TitleBox from '../SharedComponents/TitleBox';
import { ResetPwFormValues } from '../type';


const validationSchema = yup.object().shape({
  email: yup.string().required("Please provide a valid email")
    .email("Please provide a valid email")
});



const ResetPwForm: React.FC = () => {

  const [showResetForm, setShowResetForm] = useState(true);

  const handleClick = () => setShowResetForm(false);
 
  const dispatch = useAsyncDispatch();


  return (
    <Container >
      <TitleBox title="Forgot password?"/>
      {showResetForm ? 
      <Button
        onClick={handleClick}
        variant="outlined"
        size="large"
        color="primary"
        fullWidth
      >
        Reset password
      </Button>
      :
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: ResetPwFormValues,
          formikHelpers: FormikHelpers<ResetPwFormValues>
        ) => {
          dispatch(resetPw(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<ResetPwFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Email to reset password"
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
                  send password reset
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      }
    </Container >
  );
};

export default ResetPwForm;