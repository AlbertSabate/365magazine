import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { Box, Flex, Heading, Image } from 'theme-ui';
import ArticleRecipeInfo from '../components/article-recipe-info';
import ArticleRecipeIngredients from '../components/article-recipe-ingredients';
import ArticleSplashLandscape from '../components/article-splash-landscape';
import ArticleSplashPortrait from '../components/article-splash-portrait';
import BlockGroup from '../components/block-group';
import BlockRecipeStep from '../components/block-recipe-step';
import BlockText from '../components/block-text';
import Layout from '../components/layout';
import SEO from '../components/seo';
import client from '../lib/apollo';
import { isRecipeArticle } from '../schema/article';
import { BlockContent, isBlockText } from '../schema/block';
import { Post, Recipe, RootQuery } from '../schema/root';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';


const postSlugQuery = gql`
  query GetPostBySlug($slug: String) {
    allPost(
      where: {
        slug: {
          current: {
            eq: $slug
          }
        }
      }
    ) {
      _id
      _type
      title
      tagline
      contentRaw
      mainImage {
        asset {
          _id
          label
          title
          description
          size
          path
          url
          metadata {
            dimensions {
              height
              width
              aspectRatio
            }
          }
        }
      }
    }
  }
`;

const recipeSlugQuery = gql`
  query GetRecipeBySlug($slug: String) {
    allRecipe(
      where: {
        slug: {
          current: {
            eq: $slug
          }
        }
      }
    ) {
      _id
      _type
      title
      tagline
      contentRaw
      mainImage {
        asset {
          _id
          label
          title
          description
          size
          path
          url
          metadata {
            dimensions {
              height
              width
              aspectRatio
            }
          }
        }
      }
      recipeInfo {
        cookingTime
        ingredients {
          amount
          ingredient
          note
        }
        makes
        serves
      }
    }
  }
`;

const postsListQuery = gql`
  query Posts {
    allPost {
      _id
      _type
      slug {
        current
      }
      title
    }
  }
`;

const recipesListQuery = gql`
  query Recipes {
    allRecipe {
      _id
      _type
      slug {
        current
      }
      title
    }
  }
`;

async function listPosts() {
  const { data, error } = await client.query<RootQuery>({
    query: postsListQuery,
  });

  if (error) {
    console.error('error listing posts', error);
    return [];
  }
  if (!data) {
    console.error('empty list posts response');
    return [];
  }

  return data.allPost;
}

async function listRecipes() {
  const { data, error } = await client.query<RootQuery>({
    query: recipesListQuery,
  });

  if (error) {
    console.error('error listing posts', error);
    return [];
  }
  if (!data) {
    console.error('empty list posts response');
    return [];
  }

  return data.allRecipe;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [posts, recipes] = await Promise.all([
    listPosts(),
    listRecipes(),
  ]);

  const allArticles = [...posts, ...recipes];
  const allPaths: string[] = [];

  allArticles.forEach((a) => {
    if (a._id.startsWith('drafts')) {
      return;
    }
    const path = a.slug?.current;
    if (path) {
      allPaths.push(`/${path}`);
    } else {
      console.error(`article ${a._id} missing slug`);
    }
  });

  return {
    paths: allPaths,
    fallback: true,
  };
};

type Article = Post | Recipe;

async function getPostBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await client.query<RootQuery>({
    query: postSlugQuery,
    variables: {
      slug,
    },
  });

  if (error) {
    console.error(error);
  }

  const [post] = data?.allPost || [];
  if (!post || error) {
    return null;
  }

  return post;
}

async function getRecipeBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await client.query<RootQuery>({
    query: recipeSlugQuery,
    variables: {
      slug,
    },
  });

  if (error) {
    console.error(error);
  }

  const [recipe] = data?.allRecipe || [];
  if (!recipe || error) {
    return null;
  }

  return recipe;
}

type PostInitialProps = {
  slug: string;
  article: Post | Recipe;
};

export const getStaticProps: GetStaticProps<PostInitialProps> = async ({ params }) => {
  if (Array.isArray(params.slug)) {
    throw Error('slug is array');
  }

  const slug = params.slug.startsWith('/') ? params.slug.substr(1) : params.slug;

  let article = await getPostBySlug(slug);
  if (!article) {
    article = await getRecipeBySlug(slug);
  }

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      article,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
};

const ArticlePage: FC<WithRouterProps & PostInitialProps> = ({ slug, article, router, ...props }) => {
  // when the article has not been pre-rendered at build time, we will try to fetch it dynamically on the server
  // by running getStaticProps and showing fallback page here
  if (router.isFallback) {
    // todo: implement loading placeholder for the dynamic article
    return <div>loading........</div>;
  }

  const isMainImagePortrait = article.mainImage.asset.metadata.dimensions.aspectRatio < 1;

  const content = (article?.contentRaw || []) as BlockContent[];
  const [, ...restBlocks] = content;

  return (
    <Layout stickyHeader>
      <SEO title={article?.title} />
      {article && (
        <Box
          py={6}
        >
          {isMainImagePortrait
            ? <ArticleSplashPortrait article={article} />
            : <ArticleSplashLandscape article={article} />}
          <Box
            mx='auto'
            sx={{
              maxWidth: ARTICLE_WIDTH,
            }}
          >
            {isRecipeArticle(article) && article.recipeInfo && (
              <>
                <Box
                  mx={ARTICLE_GUTTER}
                  mb={6}
                >
                  <ArticleRecipeInfo
                    info={article.recipeInfo}
                  />
                </Box>
                {article.recipeInfo.ingredients.length && (
                  <Box
                    mx={ARTICLE_GUTTER}
                    mb={6}
                  >
                    <ArticleRecipeIngredients
                      ingredients={article.recipeInfo.ingredients}
                    />
                  </Box>
                )}
              </>
            )}
            <BlockGroup
              key={article._id}
              blocks={restBlocks}
            />
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default withRouter(ArticlePage);
