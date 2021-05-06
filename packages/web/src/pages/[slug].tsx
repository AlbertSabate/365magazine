import { Box } from '@theme-ui/components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { FC } from 'react';
import ArticleRecipeInfo from '../components/article-recipe-info';
import ArticleRecipeIngredients from '../components/article-recipe-ingredients';
import ArticleSplashLandscape from '../components/article-splash-landscape';
import ArticleSplashPortrait from '../components/article-splash-portrait';
import BlockGroup from '../components/block-group';
import Layout from '../components/layout';
import SEO from '../components/seo';
import getClient, { imageBuilder, usePreviewSubscription } from '../lib/sanity';
import { Article, isRecipeArticle } from '../schema/article';
import { BlockContent } from '../schema/block';
import Queries from '../schema/queries';
import { Post, Recipe } from '../schema/root';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';


export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getClient().fetch<Array<{ _id: string; slug: string; }>>(Queries.listArticlePaths);

  return {
    paths: data
      .filter(({ _id }) => !_id.startsWith('drafts.'))
      .map(({ slug }) => `/${slug}`),
    fallback: true,
  };
};

type PostInitialProps = {
  preview?: boolean;
  slug: string;
  data: {
    article: Post | Recipe
  };
};

export const getStaticProps: GetStaticProps<PostInitialProps> = async ({ params, preview }) => {
  if (Array.isArray(params.slug)) {
    throw Error('slug is array');
  }

  const slug = params.slug.startsWith('/') ? params.slug.substr(1) : params.slug;

  const { article } = await getClient().fetch<{ article?: Article }>(Queries.getArticleBySlug, { slug });
  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
      data: {
        article,
      },
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
};

const ArticlePage: FC<WithRouterProps & PostInitialProps> = ({
  preview,
  slug,
  data: initialData,
  router,
  ...props
}) => {
  // when the article has not been pre-rendered at build time, we will try to fetch it dynamically on the server
  // by running getStaticProps and showing fallback page here
  if (router.isFallback) {
    // todo: implement loading placeholder for the dynamic article
    return <div>loading........</div>;
  }

  const { data: { article } } = usePreviewSubscription(Queries.getArticleBySlug, {
    params: { slug },
    initialData,
    enabled: preview,
  });

  const isMainImagePortrait = (article.mainImage?.metadata?.dimensions?.aspectRatio || 1) < 1;

  const content = (article?.content || []) as BlockContent[];
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
