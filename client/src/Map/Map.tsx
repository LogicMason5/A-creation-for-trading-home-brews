import React, { useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import BeerMarker from './BeerMarker';
import { mapStyles } from './mapStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchActiveOffers } from '../Offers/offerSlice';
import { useAsyncDispatch } from '../store';

const mapContainerStyles = {        
  height: "92.5vh",
  width: "100%",
};

const Map: React.FC = () => {

  const dispatch = useAsyncDispatch();

  const center = useSelector(
    (state: RootState) => state.location.location
  );

  const offers = useSelector(
    (state: RootState) => state.offers.offers
  );
  
    


  useEffect(() => {
    dispatch(fetchActiveOffers());
  }, [dispatch]);

  //TSEKKAA  https://react-google-maps-api-docs.netlify.app/#googlemap
  //refen sijaan voi käyttää suoraan useGoogleMap()

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
    
  //     mapRef.current.panTo({ lat, lng });
  //     mapRef.current.setZoom(13);
    
  // }, []);

  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyles as google.maps.MapTypeStyle[]
  };

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
                <BeerMarker key={o.id} name={o.beerName} position={o.location} id={o.id} />
            );
          })
        }


      </GoogleMap>
  );
};

export default Map;