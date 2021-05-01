import { GetStaticPaths, GetStaticProps } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { FC } from 'react';
import { Box } from 'theme-ui';
import ArticleRecipeInfo from '../components/article-recipe-info';
import ArticleRecipeIngredients from '../components/article-recipe-ingredients';
import ArticleSplashLandscape from '../components/article-splash-landscape';
import ArticleSplashPortrait from '../components/article-splash-portrait';
import BlockGroup from '../components/block-group';
import Layout from '../components/layout';
import SEO from '../components/seo';
import client from '../lib/apollo';
import { isRecipeArticle } from '../schema/article';
import { BlockContent } from '../schema/block';
import Queries from '../schema/queries';
import { Post, Recipe, RootQuery } from '../schema/root';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';


async function listPosts() {
  const { data, error } = await client.query<RootQuery>({
    query: Queries.listPostSlugs,
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
    query: Queries.listRecipeSlugs,
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
    query: Queries.getPostBySlug,
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
    query: Queries.getRecipeBySlug,
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
