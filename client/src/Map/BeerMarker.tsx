import black from '../assets/black.png';
import { Marker } from '@react-google-maps/api'

const BeerMarker: React.FC<{ name: string, position: google.maps.LatLngLiteral, id: string }> =  ({ name, position, id }) => {

    const icon = {
      url: black,
      scaledSize: new google.maps.Size(60, 60),
      labelOrigin: new google.maps.Point(30, -30)
    }

    const label: google.maps.MarkerLabel = {
      text: name,
      fontSize: "24px",
      fontWeight: "bold",
      // color: "red"
    }

    const handleClick = () => {
      console.log('logging' + name)
    } 

    return (
        <Marker
          position={position}
          key={id}
          icon={icon}
          onClick={handleClick}
          label={label}
          animation={google.maps.Animation.BOUNCE}
        />
    );
  };

  export default BeerMarker;