import black from '../assets/black.png';
import { Marker } from '@react-google-maps/api'
import './Marker.css';

const BeerMarker: React.FC<{ name: string, position: google.maps.LatLngLiteral }> =  ({ name, position }) => {

    const icon = {
      url: black,
      scaledSize: new google.maps.Size(60, 60)
    }

    const handleClick = () => {
      console.log('logging' + name)
    } 

    return (
      <Marker
        position={position}
        key={name}
        icon={icon}
        onClick={handleClick}
        label={name}
      />
    );
  };

  export default BeerMarker;