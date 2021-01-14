import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import BeerMarker from './BeerMarker'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';


const Map = () => {

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const mapStyles = {        
    height: "90.3vh",
    width: "100%",
  };

  const center = {
    lat: 60.16209,
    lng: 24.92022
  };

    const offers = [
      {
        name: "Location 1",
        location: { 
          lat: 60.15,
          lng: 24.93 
        },
      },
      {
        name: "Location 2",
        location: { 
          lat: 60.15,
          lng: 24.91
        },
      },
      {
        name: "Location 3",
        location: { 
          lat: 60.163,
          lng: 24.921
        },
      }
    ];

    const options = {
      disableDefaultUI: true
    }

    return (
      <LoadScript
        googleMapsApiKey={apiKey}>
        <GoogleMap           
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          options={options}
          >
            {
              offers.map(o => {
                return (
                  <BeerMarker key={o.name} name={o.name} position={o.location} />
                )
              })
            }
          <Fab color="secondary" aria-label="add" >
            <AddIcon />
          </Fab>
        </GoogleMap>
      </LoadScript>
   )
}

export default Map;