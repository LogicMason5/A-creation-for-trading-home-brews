import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import AnimatedMarker from './AnimatedMarker';
import BeerMarker from './BeerMarker';


const Map = () => {

  const mapStyles = {        
    height: "100vh",
    width: "100%"};

  const center = {
    lat: 60.16121,
    lng: 24.92025
    }

    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
         <GoogleMap
           mapContainerStyle={mapStyles}
           zoom={13}
           center={center}
         />
      </LoadScript>
   )
}

export default Map;