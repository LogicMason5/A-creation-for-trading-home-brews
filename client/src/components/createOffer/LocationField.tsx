import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete'


const LocationField: React.FC = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey
    
  })

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      radius: 100 * 1000,
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  

  if (loadError) return (<div>Failed to load Google Maps. Please try reloading the page.</div>)
  if (!isLoaded) return (<div>Loading Google location picker...</div>)

  return (
    <div></div>
    // <Autocomplete
    //   id="autocomplete" 
    // />
  )
}








export default LocationField