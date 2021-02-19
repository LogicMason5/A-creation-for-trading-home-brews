import React, { useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import OfferMarker from './OfferMarker';
import { mapStyles } from './mapStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchActiveOffers } from '../Offers/offerSlice';
import { useAsyncDispatch } from '../store';
import LocateButton from './LocateButton';
import { useTheme } from '@material-ui/core';



const Map: React.FC = () => {

  const theme = useTheme();

  const dispatch = useAsyncDispatch();

  const center = useSelector(
    (state: RootState) => state.location.location
  );

  const offers = useSelector(
    (state: RootState) => state.offers.activeOffers
  );

  useEffect(() => {
    dispatch(fetchActiveOffers());
  }, [dispatch]);

  const appBarHeight = theme ? theme.mixins.toolbar.minHeight as number : 56;

  const mapContainerStyles = {
    height: `${window.innerHeight-appBarHeight-8}px`,
    width: "100%"
};

  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyles as google.maps.MapTypeStyle[]
  };

  return (
      <GoogleMap           
        mapContainerStyle={mapContainerStyles}
        zoom={11}
        center={center}
        options={mapOptions}
        // onLoad={onMapLoad}
        >
        {
          offers.map(o => {
            return (
                <OfferMarker key={o.id} name={o.beerName} position={o.location} id={o.id} />
            );
          })
        }
        <LocateButton />
      </GoogleMap>
  );
};

export default Map;