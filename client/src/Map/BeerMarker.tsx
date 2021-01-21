import black from '../assets/black.png';
import { Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';

const BeerMarker: React.FC<{ name: string, position: google.maps.LatLngLiteral, id: string }> =  ({ name, position, id }) => {

    const icon = {
      url: black,
      scaledSize: new google.maps.Size(60, 60),
      labelOrigin: new google.maps.Point(30, -30)
    };

    const label: google.maps.MarkerLabel = {
      text: name,
      fontSize: "24px",
      fontWeight: "bold",
      // color: "red"
    };

    const history = useHistory();

    const handleClick = () =>  {
      history.push(`/offers/${id}`);
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

  export default BeerMarker;