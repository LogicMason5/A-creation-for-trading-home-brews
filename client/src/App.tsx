
import React, { useState, useEffect } from 'react'

import Map from './components/map/Map'
import Menu from './components/menu/Menu'
import Messenger from './components/messenger/Messenger'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab'
import { Switch, Route, Link } from "react-router-dom";
import { loadMapApi } from './utils/GoogleMapsUtils'

const App: React.FC = () => {

  const [page, setPage] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
              <Tabs value={page} onChange={handleChange}>
                <Tab label="Map" component={Link} to="/"/>
                <Tab label="Messages" component={Link} to="messages"/>
                <Tab label="Menu" component={Link} to="menu" />
              </Tabs>
              <Switch>
                <Route path="/messages" render={() => <Messenger />} />
                <Route path="/menu" render={() => <Menu />} />
                <Route path="/" render={() => scriptLoaded && <Map />} />
              </Switch>
            </AppBar>

        </div>
    );
  }

  export default App;
