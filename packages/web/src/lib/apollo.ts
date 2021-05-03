import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SanityProjectDetails } from '../types/sanity.types';

const {
  SANITY_PROJECT_ID = 'n4kphzu5',
  SANITY_DATASET = 'dev',
  SANITY_TAG = 'default',
  SANITY_USE_CDN = 'false',
  SANITY_TOKEN,
} = process.env;

export const SANITY_PROJECT: SanityProjectDetails = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
};

const useCdn = SANITY_USE_CDN === 'true';

const SANITY_BASE_URL = `https://${SANITY_PROJECT_ID}.${useCdn ? 'apicdn' : 'api'}.sanity.io`;

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: `${SANITY_BASE_URL}/v1/graphql/${SANITY_DATASET}/${SANITY_TAG}`,
    headers: {
      authorization: `Bearer ${SANITY_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
