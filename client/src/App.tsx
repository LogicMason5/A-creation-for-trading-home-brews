import React from 'react'
import CreateOfferForm from './components/createOffer/CreateOfferForm'
import Map from './components/map/Map'
import Messenger from './components/messenger/Messenger'
import Box from '@material-ui/core/Box';
import Header from './components/header/Header';
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {

    return (
      <Box>
        <Header />
        <Switch>
          <Route path="/create-offer" render={() => <CreateOfferForm />} />
          <Route path="/messages" render={() => <Messenger />} />
          <Route path="/" render={() => <Map />} />
        </Switch>
     </Box>
    );
  }

  export default App;
