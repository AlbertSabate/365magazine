/* eslint-disable react/jsx-props-no-spreading, max-len, global-require */
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import { Router } from 'next/router';
import { SanityProjectDetails } from '../types/sanity.types';


const SANITY_PROJECT_ID = 'n4kphzu5';
const SANITY_DATASET = 'dev';
const SANITY_TAG = 'default';
const SANITY_USE_CDN = false;
const SANITY_TOKEN = 'skH4iyPeo4EYaoIshd9MoHRZMpHZPU3wIb9H2bY4N3V2yihnQreIqT4huZ0x2sakfT5emgcwmlBAlgqFRVIt7YA45vuOzmfXsF6mbooIK5KwSbULLiUZbC3JYTI5KPS6XWzA6f352rud4YELUgaqfFEsfu3pux888h4zmw2SiFZ5OG8lRkJw';

export const SANITY_PROJECT: SanityProjectDetails = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
};

const SANITY_BASE_URL = `https://${SANITY_PROJECT_ID}.${SANITY_USE_CDN ? 'apicdn' : 'api'}.sanity.io`;


type ApolloClientCache = Record<string, unknown>;
type ApolloClientState = NormalizedCacheObject & Record<string, unknown>;

type ApolloContext = {
  apolloClient: ApolloClient<ApolloClientCache>;
  apolloState: ApolloClientState;
};

type CustomPageContext = NextPageContext & ApolloContext;
type CustomAppContext = AppContextType<Router> & { ctx: CustomPageContext };
type CustomContext = CustomPageContext | CustomAppContext;

const isAppContext = (ctx?: CustomContext): ctx is CustomAppContext => !!(ctx as CustomAppContext)?.ctx;


// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<ApolloClientCache> | null = null;


const createApolloClient = (initialState?: NormalizedCacheObject, ctx?: CustomContext) => new ApolloClient({
  ssrMode: !!ctx,
  link: new HttpLink({
    uri: `${SANITY_BASE_URL}/v1/graphql/${SANITY_DATASET}/${SANITY_TAG}`,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    fetch: ctx ? require('cross-fetch') as typeof fetch : fetch,
    headers: {
      authorization: `Bearer ${SANITY_TOKEN}`,
    },
  }),
  cache: new InMemoryCache().restore(initialState),
});


/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param {NormalizedCacheObject} initialState
 * @param {NextPageContext} ctx
 * @returns {any}
 */
const initApolloClient = (initialState?: NormalizedCacheObject, ctx?: CustomContext): ApolloClient<ApolloClientCache> => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return createApolloClient(initialState, ctx);
  }

  globalApolloClient = globalApolloClient || createApolloClient(initialState, ctx);
  return globalApolloClient;
};


/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps.
 * @param {NextPageContext | AppContextType} ctx
 * @returns {NextPageContext | AppContextType}
 */
const initOnContext = (ctx: CustomContext) => {
  const apolloState = isAppContext(ctx) ? ctx.ctx.apolloState : ctx.apolloState;
  const apolloClient = (isAppContext(ctx) ? ctx.ctx.apolloClient : ctx.apolloClient)
    || initApolloClient(apolloState, isAppContext(ctx) ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  // @ts-ignore
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  if (isAppContext(ctx)) {
    ctx.ctx.apolloClient = apolloClient;
  } else {
    ctx.apolloClient = apolloClient;
  }

  return ctx;
};

type WithApolloProps = {
  apolloClient: ApolloClient<ApolloClientCache>;
  apolloState: ApolloClientState;
};

const withApollo = ({ ssr = false }) => (PageComponent: NextPage) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: WithApolloProps) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  console.debug('ssr: ', !!ssr);
  console.debug('GIP: ', !!PageComponent.getInitialProps);

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: CustomContext) => {
      console.debug('Run GIP');

      const ctxWithApollo = initOnContext(ctx);

      let pageProps = {};
      if (isAppContext(ctx)) {
        pageProps = await App.getInitialProps(ctx);
      } else if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // only on the server
      if (typeof window === 'undefined') {
        const { AppTree } = ctx;
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (!isAppContext(ctx) && ctx.res.writableEnded) {
          return pageProps;
        }

        if (ssr && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import('@apollo/react-ssr');

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            let props;
            if (isAppContext(ctx)) {
              props = { ...pageProps, apolloClient: ctx.ctx.apolloClient };
            } else {
              props = { pageProps: { ...pageProps, apolloClient: ctx.apolloClient } };
            }

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<AppTree {...props} />);
          } catch (err) {
            console.error('Error while running `getDataFromTree`', err);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: (
          isAppContext(ctxWithApollo)
            ? ctxWithApollo.ctx.apolloClient
            : ctxWithApollo.apolloClient
        ).cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: isAppContext(ctx) ? ctx.ctx.apolloClient : ctx.apolloClient,
      };
    };
  }

  return WithApollo;
};

export default withApollo;
