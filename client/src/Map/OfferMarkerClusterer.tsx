/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { useRef } from 'react';
import { Marker, MarkerClusterer } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { setDrawerOpen } from '../Display/displaySlice';
import { RootState } from '../rootReducer';
import markerImage from '../assets/black.png';
import ClusterMenu from './ClusterMenu';

const OfferMarkerClusterer: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [menuItems, setMenuItems] = React.useState<{ offerName: string, offerId: string }[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const clustererRef = useRef(null);

  const history = useHistory();

  const isLoaded = useSelector(
    (state: RootState) => state.display.mapsLoaded,
  );

  const offers = useSelector(
    (state: RootState) => state.offers.activeOffers,
  );

  const dispatch = useDispatch();

  if (!isLoaded) return <CircularProgress />;

  const icon = {
    url: markerImage,
    scaledSize: new google.maps.Size(60, 60),
    labelOrigin: new google.maps.Point(30, -30),
  };

  const clusterCalculator = (markers: any, _numOfStyles: number) => {
    switch (markers.length) {
      case 2:
        return ({
          title: `${markers.length} offers in this area. Click the marker to view them in a menu or Zoom in.`,
          text: `${markers.length}\u00A0offers`,
          index: 1,
        });
      case 3: case 4:
        return ({
          title: `${markers.length} offers in this area. Click the marker to view them in a menu or Zoom in.`,
          text: `${markers.length}\u00A0offers`,
          index: 2,
        });
      default:
        return ({
          title: `${markers.length} offers in this area. Click the marker to view them in a menu or Zoom in.`,
          text: `${markers.length}\u00A0offers`,
          index: 3,
        });
    }
  };

  const handleMarkerClick = (id: string) => {
    history.push(`/offers/${id}`);
    dispatch(setDrawerOpen(true));
  };

  const handleClusterClick = (cluster: any) => {
    const markers = cluster.getMarkers();
    setMenuOpen(true);
    setMenuItems(markers.map((marker: any) => ({ offerName: marker.label.text, offerId: marker.title })));
    setAnchorEl(clustererRef.current);
  };

  return (
    <>
      <MarkerClusterer
        ref={clustererRef}
        averageCenter
        enableRetinaIcons
        zoomOnClick={false}
        calculator={clusterCalculator}
        onClick={(cluster) => handleClusterClick(cluster)}
        styles={[
          {
            height: 96,
            width: 96,
            anchorIcon: [90, 44],
            url: 'https://res.cloudinary.com/www-homebrewswap-app/image/upload/v1619430491/assets/48_ipwz2s.png',
            textSize: 24,
            anchorText: [-60, 0],
          },
          {
            height: 128,
            width: 128,
            anchorIcon: [120, 66],
            url: 'https://res.cloudinary.com/www-homebrewswap-app/image/upload/v1619422494/assets/m1_whsxbc.png',
            textSize: 30,
            anchorText: [-80, 0],
          },
          {
            height: 192,
            width: 192,
            anchorIcon: [180, 98],
            url: 'https://res.cloudinary.com/www-homebrewswap-app/image/upload/v1619430491/assets/96_pacwx7.png',
            textSize: 36,
            anchorText: [-120, 0],
          },
        ]}
      >
        {(clusterer) => offers.map((offer) => (
          <Marker
            title={offer.id}
            position={{
              lat: offer.location.lat,
              lng: offer.location.lng,
            }}
            key={offer.id}
            icon={icon}
            label={{
              text: offer.beerName,
              fontSize: '20px',
              fontWeight: 'bold',
            }}
            onClick={() => handleMarkerClick(offer.id)}
            clusterer={clusterer}
          />
        ))}
      </MarkerClusterer>
      <ClusterMenu
        anchorEl={anchorEl}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuItems={menuItems}
        onMenuItemClick={handleMarkerClick}
      />
    </>

  );
};

export default OfferMarkerClusterer;
