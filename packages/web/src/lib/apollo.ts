import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { Article } from '../schema/article';
import Queries from '../schema/queries';
import { Post, Recipe, RootQuery } from '../schema/root';
import { SanityProjectDetails } from '../types/sanity.types';

/* eslint-disable prefer-destructuring */
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_TAG = process.env.SANITY_TAG;
const SANITY_USE_CDN = process.env.SANITY_USE_CDN;
const SANITY_TOKEN = process.env.SANITY_TOKEN;
/* eslint-enable prefer-destructuring */

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


const pickArticle = <T extends Article = Article>(articles: T[] = [], preview?: boolean): T => articles
  .filter((a) => {
    const isDraft = a._id.startsWith('drafts.');
    return preview ? isDraft : !isDraft;
  })[0];

export async function getPostBySlug(slug: string, draft?: boolean): Promise<Post | null> {
  const { data, error } = await client.query<RootQuery>({
    query: Queries.getPostBySlug,
    variables: {
      slug,
    },
  });

  if (error) {
    console.error(error);
  }

  const post = pickArticle<Post>(data?.allPost, draft);
  if (!post) {
    return null;
  }

  return post;
}

export async function getRecipeBySlug(slug: string, draft?: boolean): Promise<Recipe | null> {
  const { data, error } = await client.query<RootQuery>({
    query: Queries.getRecipeBySlug,
    variables: {
      slug,
    },
  });

  if (error) {
    console.error(error);
  }

  const recipe = pickArticle<Recipe>(data?.allRecipe, draft);
  if (!recipe) {
    return null;
  }

  return recipe;
}
