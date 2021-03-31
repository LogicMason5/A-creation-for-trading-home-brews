import { Typography } from '@material-ui/core';
import React from 'react';
import CookieConsent from 'react-cookie-consent';

const Cookies: React.FC = () => (
  <>
    <CookieConsent
      buttonId="acceptButton"
      location="bottom"
      cookieName="3rdParty"
      style={{
        background: '#b23c17',
      }}
      buttonStyle={{
        background: '#ff9800',
      }}
      buttonText={(
        <Typography>
          ACCEPT
        </Typography>
      )}
    >
      <Typography>
        This website needs cookies to function. By using the site you consent.
      </Typography>
    </CookieConsent>
  </>
);

export default Cookies;
