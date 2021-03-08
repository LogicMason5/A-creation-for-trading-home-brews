import React, { useEffect } from 'react';
import {
  Container, Grid, Button, FormLabel, CircularProgress,
} from '@material-ui/core';
import {
  Formik, FormikHelpers, FormikProps, Form, Field,
} from 'formik';
import { RadioGroup } from 'material-ui-formik-components';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import FormTextField from '../../SharedComponents/FormTextField';
import LocationField from '../../SharedComponents/LocationField';
import FormSlider from '../../SharedComponents/FormSlider';
import { RootState } from '../../rootReducer';
import { setDrawerOpen } from '../../Display/displaySlice';
import { AppThunk, useAsyncDispatch } from '../../store';
import { OfferFormValues } from '../../type';
import TitleBox from '../../SharedComponents/TitleBox';
import ImageUploader from '../../SharedComponents/ImageUploader';
import ImageDisplay from '../../SharedComponents/ImageDisplay';

interface OfferFormProps {
  formTitle: string;
  initValues: OfferFormValues;
  actionOnSubmit: (formValues: OfferFormValues) => AppThunk;
  buttonText: string;
}

const validationSchema = yup.object().shape({
  beerName: yup.string().required('A name is required').min(3).max(40),
  description: yup.string().required('Required').min(6).max(1200),
  location: yup.string().required('A valid location is necessary to display the offer on the map'),
});

const EditOfferForm: React.FC<OfferFormProps> = (props) => {
  const {
    formTitle, initValues, actionOnSubmit, buttonText,
  } = props;

  const dispatch = useAsyncDispatch();

  const { mapsLoaded } = useSelector(
    (state: RootState) => state.display,
  );

  const { offerUploadUrl } = useSelector(
    (state: RootState) => state.display,
  );

  useEffect(() => {
    dispatch(setDrawerOpen(true));
    return () => {
      dispatch(setDrawerOpen(false));
    };
  }, [dispatch]);

  return (
    <Container>
      <TitleBox title={formTitle} />
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: OfferFormValues,
          formikHelpers: FormikHelpers<OfferFormValues>,
        ) => {
          dispatch(actionOnSubmit(values));
          formikHelpers.setSubmitting(false);
        }}
      >
        {(formikProps: FormikProps<OfferFormValues>) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  id="beerNameField"
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
                  id="descriptionField"
                  name="description"
                  label="A few words about your brew"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="The level of detail is up to you"
                  multiline
                  rows="6"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="packageSizeField"
                  label="Package Size"
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
                  id="amountField"
                  component={FormSlider}
                  name="amount"
                  defaultValue={2}
                  step={1}
                  marks
                  min={1}
                  max={12}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                {mapsLoaded
                  ? (
                    <Field
                      label="Give a default trade location"
                      name="location"
                      component={LocationField}
                      fullWidth
                      initHelperText="Any public location will do. A valid location is required to save."
                    />
                  )
                  : <CircularProgress />}
              </Grid>
              <Grid item xs={12}>
                <ImageUploader />
              </Grid>
              <Grid item xs={12}>
                <ImageDisplay url={offerUploadUrl} />
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
                <Field
                  id="reviewLinkField"
                  name="reviewLink"
                  label="Link to review/untappd"
                  size="small"
                  component={FormTextField}
                  fullWidth
                  initHelperText="optional"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  id="submitOfferButton"
                  type="submit"
                  variant="outlined"
                  size="large"
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  fullWidth
                >
                  {buttonText}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditOfferForm;
