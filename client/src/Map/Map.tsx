import React, { useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api'
import BeerMarker from './BeerMarker'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import { mapStyles } from './mapStyles'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchOffers } from '../Offers/offersSlice';
import { Link } from "react-router-dom"


const Map: React.FC = () => {

  const mapContainerStyles = {        
    height: "90.3vh",
    width: "100%",
  };

  const dispatch = useDispatch()

  const center = useSelector(
    (state: RootState) => state.location.location
  )

  const { offers } = useSelector(
    (state: RootState) => state.offers
  )

    //add dispatch and offers to 2nd argument later
  useEffect(() => {
    dispatch(fetchOffers())
  }, [dispatch])


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
                  <BeerMarker key={o.id} name={o.beerName} position={o.location} id={o.id} />
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