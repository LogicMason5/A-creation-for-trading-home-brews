
import React, { useState, useEffect } from 'react'
import { loadMapApi } from './utils/GoogleMapsUtils'
import Map from './components/map/Map'
import Menu from './components/menu/Menu'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab'
import { Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
        setScriptLoaded(true);
    });
}, []);

const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
  setPage(newValue);
};

  return (
      <div className="App">
          <AppBar position="static">
            <Tabs value={page} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Map"  />
              <Tab label="Messenger"  />
              <Tab label="Menu"  />
            </Tabs>
            <Switch>
              <Route path="/tab2" render={() => <Menu />} />
              <Route path="/tab3" render={() => <div>Tab 3</div>} />
              <Route path="/" render={() => scriptLoaded && <Map />} />
            </Switch>
          </AppBar>

      </div>
  );
}

export default App;

          /* {scriptLoaded && (
              <Map />
          )} */