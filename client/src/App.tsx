
import React, { useState, useEffect } from 'react'
import { loadMapApi } from './utils/GoogleMapsUtils'
import Map from './components/map/Map'
import './App.css';

const App: React.FC = () => {

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
        setScriptLoaded(true);
    });
}, []);

return (
  <div className="App">
      <h1>test</h1>
      {scriptLoaded && (
          <Map />
      )}
  </div>
);
}

export default App;
