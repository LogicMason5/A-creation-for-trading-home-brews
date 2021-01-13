
import React, { useState, useEffect } from 'react'
import { loadMapApi } from './utils/GoogleMapsUtils'
import Map from './components/map/Map'
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab'

const App: React.FC = () => {

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
        setScriptLoaded(true);
    });
}, []);

const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
  setValue(newValue);
};

return (
  <div className="App">
      <h1>test</h1>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
          <Tab label="Item Three"  />
        </Tabs>
      </AppBar>

      {scriptLoaded && (
          <Map />
      )}
  </div>
);
}

export default App;
