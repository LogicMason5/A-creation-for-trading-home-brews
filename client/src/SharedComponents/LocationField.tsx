/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Grid from '@material-ui/core/Grid';
import { TextFieldProps } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FieldProps } from 'formik';
import { useDispatch } from 'react-redux';
import { setLocation } from '../Map/locationSlice';
import FormTextField from './FormTextField';

const LocationField: React.FC<
FieldProps & TextFieldProps & { initHelperText: string }> = (props) => {
  const dispatch = useDispatch();

  const { form } = props;

  const {
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      // can define search scope here later based on user location
    },
    debounce: 200,
  });

  const handleSelect = async (newValue: string) => {
    if (!newValue) return;
    setValue(newValue, false);
    const results = await getGeocode({ address: newValue });
    const { lat, lng } = await getLatLng(results[0]);
    dispatch(setLocation({ lat, lng, asText: newValue }));
  };

  const renderSuggestion = (option: google.maps.places.AutocompletePrediction) => {
    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
      option.structured_formatting.main_text,
      matches.map((match) => [match.offset, match.offset + match.length]),
    );

    return (
      <Grid container alignItems="center">
        <Grid item xs>
          {parts.map((part, index) => (
            <span key={index.toString() + part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
              {part.text}
            </span>
          ))}
          <Typography variant="body2" color="textSecondary">
            {option.structured_formatting.secondary_text}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Autocomplete
      id="locationField"
      defaultValue={{ description: form.initialValues.location } as google.maps.places.AutocompletePrediction} // hacky way to give default value from a string only
      options={data}
      autoComplete
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      getOptionSelected={() => true}
      onChange={(_event: ChangeEvent<{}>, newValue: google.maps.places.AutocompletePrediction | null) => {
        if (newValue) {
          handleSelect(newValue.description);
          form.setFieldValue('location', newValue.description); // "intercepting" the Formik function to keep it in sync with the Autocomplete
        }
      }}
      onInputChange={(_event, newInputValue) => {
        setValue(newInputValue);
        form.setFieldValue('location', newInputValue); // "intercepting" the Formik function to keep it in sync with the Autocomplete
      }}
      renderInput={(params) => (
        <FormTextField
          {...props}
          {...params}
        />
      )}
      renderOption={renderSuggestion}
      noOptionsText="Type to get suggestions"
    />
  );
};

export default LocationField;
