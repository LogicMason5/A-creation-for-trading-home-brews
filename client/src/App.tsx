import React, { useState } from 'react'
import Menu from './components/menu/Menu'
import Map from './components/map/Map'
import Messenger from './components/messenger/Messenger'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { Switch, Route, Link } from "react-router-dom";

const App: React.FC = () => {

  const [page, setPage] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setPage(newValue);
  };

    return (
        <Box className="App">
            <AppBar position="static">
              <Tabs value={page} onChange={handleChange} variant="fullWidth">
                <Tab label="Map" component={Link} to="/"/>
                <Tab label="Messages" component={Link} to="messages"/>
                <Tab label="Menu" component={Link} to="menu" />
              </Tabs>
            </AppBar>
            <Switch>
                <Route path="/messages" render={() => <Messenger />} />
                <Route path="/menu" render={() => <Map />} />
                <Route path="/" render={() =>  <Map />} />
             </Switch>
        </Box>
    );
  }

  export default App;
