import React, { useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import BeerMarker from './BeerMarker';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { mapStyles } from './mapStyles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { fetchOffers } from '../Offers/offersSlice';

// const useStyles = makeStyles((theme: Theme) => createStyles({

//   alertOnMap: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   }

// }));

const mapContainerStyles = {        
  height: "100vh",
  width: "100%",
};

const Map: React.FC = () => {

  // const classes = useStyles();

  const dispatch = useDispatch();

  const center = useSelector(
    (state: RootState) => state.location.location
  );

  const offers = useSelector(
    (state: RootState) => state.offers.offers
  );

    //add dispatch and offers to 2nd argument later
  useEffect(() => {
    dispatch(fetchOffers());
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