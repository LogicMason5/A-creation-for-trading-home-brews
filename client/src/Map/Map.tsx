import React, { CSSProperties, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import OfferMarker from './OfferMarker';
import { mapStyles } from './mapStyles';
import { RootState } from '../rootReducer';
import { fetchActiveOffers } from '../Offers/offerSlice';
import { useAsyncDispatch } from '../store';
import LocateButton from './LocateButton';

const Map: React.FC = () => {
  const dispatch = useAsyncDispatch();

  const center = useSelector(
    (state: RootState) => state.location.location,
  );

  const offers = useSelector(
    (state: RootState) => state.offers.activeOffers,
  );

  useEffect(() => {
    dispatch(fetchActiveOffers());
  }, [dispatch]);

  const mapContainerStyles: CSSProperties = {
    height: '100%',
    width: '100%',
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyles as google.maps.MapTypeStyle[],
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyles}
      zoom={6}
      center={center}
      options={mapOptions}
    >
      {offers ? offers.map((o) => (
        <OfferMarker
          key={o.id}
          name={o.beerName}
          position={o.location}
          id={o.id}
        />
      )) : null}
      <LocateButton />
    </GoogleMap>
  );
};

export default Map;
