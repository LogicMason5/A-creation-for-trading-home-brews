import black from '../../assets/black.png';

const BeerMarker = (props: any) => {
    const { color, name } = props;

    const handleClick = () => {

      console.log('moi')
      new google.maps.Marker({
        position: new google.maps.LatLng(60.16, 29.1),
        icon: black,
      })
    }

    return (
      <div>
        <img src={black} onClick={handleClick}/>
      </div>
    );
  };

  export default BeerMarker;