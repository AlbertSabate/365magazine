/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

require('typeface-montserrat');
require('typeface-playfair-display');


export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
