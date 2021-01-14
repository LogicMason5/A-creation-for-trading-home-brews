import React from "react";
import { Container, Typography, Grid, Button, Box } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "./FormTextField";
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
    <Container maxWidth="md">
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Create a new trade offer! <br />
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  label="Beer name"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  label="Description"
                  size="small"
                  component={FormTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
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