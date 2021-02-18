import React from 'react';
import black from '../assets/black.png';
import { Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen } from '../Navigation/displaySlice';
import { RootState } from '../rootReducer';


interface OfferMarkerProps {
  name: string;
  position: google.maps.LatLngLiteral;
  id: string
}

const OfferMarker: React.FC<OfferMarkerProps> =  ({ name, position, id }) => {

  const history = useHistory();

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded
  );

  const dispatch = useDispatch();

  if (!isLoaded) return null;

  const label: google.maps.MarkerLabel = {
    text: name,
    fontSize: "24px",
    fontWeight: "bold",
    // color: "red"
  };

  const icon = {
    url: black,
    scaledSize: new google.maps.Size(60, 60),
    labelOrigin: new google.maps.Point(30, -30)
  };
  
  const handleClick = () =>  {
    history.push(`/offers/${id}`);
    dispatch(setDrawerOpen(true));
  };

  return (
      <Marker
        position={position}
        key={id}
        icon={icon}
        label={label}
        animation={google.maps.Animation.BOUNCE}
        onClick={handleClick}
      />
  );
};

  export default OfferMarker;