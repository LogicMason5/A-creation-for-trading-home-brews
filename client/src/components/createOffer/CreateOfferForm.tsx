import React from 'react';
import { Container, Typography, Grid, Button, Box, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "./FormTextField";
import LocFieldTest from './LocFieldTest'
import * as yup from "yup";



const CreateOfferForm: React.FC = () => {

  interface FormValues {
    beerName: string;
    description: string;
  }
  
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required")
  });

  return (
    <Container fixed>
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Create an offer <br />
        </Typography>
      </Box>
      <Formik
        initialValues={{
          beerName: "",
          description: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          alert(JSON.stringify(values, null, 2));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Field
                  name="name"
                  label="What do you call it?"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="This name will be displayed on the map"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  label="A few words about your brew"
                  placeholder="test"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Users can filter based on this description"
                  multiline="true"
                  rows="6"

                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Package size</FormLabel>
                <Field
                  component={RadioGroup} row label="package size" 
                  >
                  <FormControlLabel value="0.33" control={<Radio />} label="0.33" />
                  <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
                  <FormControlLabel value="0.75" control={<Radio />} label="0.75+" />
                </Field>
                <Field component={LocFieldTest}>
                  
                </Field>
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
}

export default CreateOfferForm