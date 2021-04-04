import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SanityProjectDetails } from '../types/sanity.types';

const SANITY_PROJECT_ID = 'n4kphzu5';
const SANITY_DATASET = 'dev';
const SANITY_TAG = 'default';
const SANITY_USE_CDN = false;
// eslint-disable-next-line max-len
const SANITY_TOKEN = 'skH4iyPeo4EYaoIshd9MoHRZMpHZPU3wIb9H2bY4N3V2yihnQreIqT4huZ0x2sakfT5emgcwmlBAlgqFRVIt7YA45vuOzmfXsF6mbooIK5KwSbULLiUZbC3JYTI5KPS6XWzA6f352rud4YELUgaqfFEsfu3pux888h4zmw2SiFZ5OG8lRkJw';

export const SANITY_PROJECT: SanityProjectDetails = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
};

const SANITY_BASE_URL = `https://${SANITY_PROJECT_ID}.${SANITY_USE_CDN ? 'apicdn' : 'api'}.sanity.io`;

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
