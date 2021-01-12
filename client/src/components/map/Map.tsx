import React, { useRef, useState, useEffect } from 'react'
import { GoogleLatLng, GoogleMap } from '../../types';


const Map: React.FC = () => {

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();

  const startMap = (): void => {
    if (!map) {
        defaultMapStart();
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(60.16211995524449, 24.920254801252657);
    initMap(10, defaultAddress);
  };

  const initMap = (zoomLevel: number, adress: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: adress,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          draggableCursor: 'pointer'
        })
      )
    }
  }

  return (
    <div className="map-container" >
      <div ref={ref} className="map-container_map" style={{ height: '100vh', width: '100%' }}></div>
    </div>
    );

}

export default Map;