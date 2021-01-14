import './Marker.css';

const AnimatedMarker = (props: any) => {
    const { color, name } = props;

    const handleClick = () => {
      console.log('moi')
    }

    return (
      <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
          onClick={handleClick}
        />
        <div className="pulse" />
      </div>
    );
  };

  export default AnimatedMarker;