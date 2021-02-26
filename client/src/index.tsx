import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import history from './utils/history';
import store from './store';
import App from './App';
import theme from './utils/theme';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
