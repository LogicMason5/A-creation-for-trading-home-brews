import React from 'react';
import ReactDOM from 'react-dom';
import {  Router } from 'react-router-dom';
import history from './utils/history';
import { Provider } from 'react-redux';
import store from './store';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <CssBaseline />
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

