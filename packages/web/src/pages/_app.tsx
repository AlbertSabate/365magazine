/* eslint-disable react/jsx-props-no-spreading */
import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import client from '../lib/apollo';

// todo: restrict imports to specific weights/styles as necessary
// see: https://fontsource.org/
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/playfair-display';
import '@fontsource/radley';

export default function CustomApp({ Component, pageProps }): ReactNode {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
