/* eslint-disable react/jsx-props-no-spreading */
// todo: restrict imports to specific weights/styles as necessary
// see: https://fontsource.org/
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/playfair-display';
import '@fontsource/radley';
import { ReactNode } from 'react';

export default function CustomApp({ Component, pageProps }): ReactNode {
  return (
    <Component {...pageProps} />
  );
}
