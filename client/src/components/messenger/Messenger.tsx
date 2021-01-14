import React from 'react'
// eslint-disable-next-line import/no-webpack-loader-syntax
// import Icon from './beer_marker_black.svg';
// import Image from '../../assets/black.png'
import black from '../../assets/black.png'

const Messenger: React.FC = () => {

  
  return (
    <div>
      <div className="test">
        test      
      </div>
      <img src={"../../assets/black.png"} alt="Logo"/>
      <img src={black} alt="Logo"/>
    </div>
  )
}

export default Messenger;