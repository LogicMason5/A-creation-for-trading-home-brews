/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import Grid from '@material-ui/core/Grid';
import { TextField, TextFieldProps } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FieldProps, getIn } from 'formik';
import { useDispatch } from 'react-redux';
import { setLocation } from '../Map/locationSlice';

const LocationField: React.FC<
FieldProps & TextFieldProps & { initHelperText: string }> = (props) => {
  const dispatch = useDispatch();

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

  const {
    error, helperText, initHelperText, field, ...rest
  } = props;

  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);
  console.log(field.value);
  // console.log(rest);

  return (
    <Autocomplete
      id="locationField"
      defaultValue={{ description: rest.form.initialValues.location } as google.maps.places.AutocompletePrediction}
      options={data}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      getOptionSelected={() => true}
      onChange={(_event: ChangeEvent<{}>, newValue: google.maps.places.AutocompletePrediction | null) => {
        if (newValue) {
          handleSelect(newValue.description);
          rest.form.setFieldValue('location', newValue.description);
        }
      }}
      onInputChange={(_event, newInputValue) => {
        setValue(newInputValue);
        rest.form.setFieldValue('location', newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          error={error ?? Boolean(isTouched && errorMessage)}
          helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : initHelperText)}
          {...rest}
          {...params}
          {...field}
        />
      )}
      renderOption={renderSuggestion}
      noOptionsText="Type to get suggestions"
    />
  );
};

export default LocationField;
