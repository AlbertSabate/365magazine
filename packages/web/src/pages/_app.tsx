/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';

require('typeface-montserrat');
require('typeface-playfair-display');


export default function CustomApp({ Component, pageProps }): ReactNode {
  return <Component {...pageProps} />;
}
