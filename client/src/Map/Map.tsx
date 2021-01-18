import React from 'react';
import { GoogleMap } from '@react-google-maps/api'
import BeerMarker from './BeerMarker'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import { mapStyles } from './mapStyles'


const Map: React.FC = () => {

  const mapContainerStyles = {        
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

    const mapRef = React.useRef() as any;

    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
      
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13);
      
    }, []);

    const mapOptions = {
      disableDefaultUI: true,
      styles: mapStyles as google.maps.MapTypeStyle[]
    }

    return (

        <GoogleMap           
          mapContainerStyle={mapContainerStyles}
          zoom={13}
          center={center}
          options={mapOptions}
          onLoad={onMapLoad}
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
   )
}

export default Map;