import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Grid from '@material-ui/core/Grid';
import { TextFieldProps } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FieldProps } from 'formik';
import FormTextField from './FormTextField'



const LocationField: React.FC<FieldProps & TextFieldProps & { initHelperText: string }> = props => {

  const {

    suggestions: { data },
    setValue,

  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 200,
  });

  const handleSelect = (newValue: google.maps.places.AutocompletePrediction) => {
    const description = newValue.description;
    console.log('in handle select. desc: ' + description)

    setValue(description, false);

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const renderSuggestion = (option: google.maps.places.AutocompletePrediction) => {
    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
      option.structured_formatting.main_text,
      matches.map((match: any) => [match.offset, match.offset + match.length]),
    );

    return (
      <Grid container alignItems="center">
        <Grid item xs>
          {parts.map((part, index) => (
            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
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
      id="location-autocomplete"
      options={data}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      getOptionSelected={() => true}
      autoComplete
      includeInputInList
      onChange={(event: any, newValue: google.maps.places.AutocompletePrediction | null) => {
        console.log('printing in onCHange' + newValue)
        newValue ? handleSelect(newValue) : console.log('no new value')
      }}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      renderInput={(params) => (
        <FormTextField 
        {...params}
        {...props}/>
      )}
      renderOption={renderSuggestion}
    />
  );
};

export default LocationField;