import React from 'react';
import ReactDOM from 'react-dom';
import {  Router } from 'react-router-dom';
import history from './utils/history';
import { Provider } from 'react-redux';
import store from './store';
// import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import theme from './utils/theme';
import { ThemeProvider } from '@material-ui/core';


ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {/* <CssBaseline /> */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>,
  document.getElementById('root')
);

