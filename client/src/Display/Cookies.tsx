import React from 'react';
import CookieConsent from 'react-cookie-consent';

const Cookies: React.FC = () => (
  <CookieConsent
    debug
    buttonId="acceptButton"
    location="bottom"
    cookieName="3rdParty"
    style={{
      background: '#b23c17',
      fontFamily: 'Roboto',
    }}
    buttonStyle={{
      background: '#ff9800',
    }}
    buttonText="ACCEPT"
  >
    This website needs cookies to function. By using the site you consent.
  </CookieConsent>
);

export default Cookies;
