import React from 'react';
import { Container, Typography, Grid, Button, Box, Radio, FormControlLabel, FormLabel } from "@material-ui/core";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import FormTextField from "./FormTextField";
import { RadioGroup } from "material-ui-formik-components";
import * as yup from "yup";
import LocationField from './LocationField';
import Slider from './FormSlider'

const CreateOfferForm: React.FC = () => {

  interface FormValues {
    beerName: string;
    description: string;
    packageSize: string;
    amount: number;
    location: string;
    recipeLink: string;
  }
  
  const validationSchema = yup.object().shape({
    beerName: yup.string().required("A name is required"),
    description: yup.string().required("Required"),
    // packageSize: yup.string().required("Pick any package size and specify in description if necessary"),
    location: yup.string().required("A valid location is necessary to display the offer on the map")
  });

  return (
    <Container fixed>
      <Box mb={3} p={2}>
        <Typography
          align="center"
          variant="h6"
          style={{ lineHeight: 1.25 }}
        >
          Create an offer
        </Typography>
      </Box>
      <Formik
        initialValues={{
          beerName: "",
          description: "",
          packageSize: "",
          amount: 2,
          location: "",
          recipeLink: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: FormValues,
          formikHelpers: FormikHelpers<FormValues>
        ) => {
          console.log('test')  
          console.log(values)
          alert(JSON.stringify(values, null, 2));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Field
                  name="beerName"
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
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="Users can filter based on this description"
                  multiline={true}
                  rows="6"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Package size</FormLabel>
                <Field
                  component={RadioGroup}
                  name="packageSize"
                  options={[
                    { value: '0.33', label: '0.33' },
                    { value: '0.5', label: '0.5' },
                    { value: 'other', label: 'other' },
                  ]}
                  groupProps={{ row: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Amount</FormLabel>
                <Field 
                  component={Slider}
                  name="amount"
                  defaultValue={2}
                  step={1}
                  marks
                  min={1}
                  max={12}
                  valueLabelDisplay="auto"
                  // onChange={(event, value) => setFieldValue("amount", value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="location"
                  label="Trade location"
                  component={LocationField}
                  fullWidth
                  initHelperText="Give a default location for the trade. Any public location will do."
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="recipeLink"
                  label="Link to recipe/brewing notes"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="optional"
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
}

export default CreateOfferForm