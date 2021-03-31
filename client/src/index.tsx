import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import history from './utils/history';
import store from './store';
import App from './App';
import theme from './utils/theme';

Sentry.init({
  dsn: 'https://c964dd19b2bb4c5aa01ff97713c1d15b@o546845.ingest.sentry.io/5668711',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
});

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
