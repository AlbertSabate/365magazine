import { Box, Button, Flex, Text } from '@theme-ui/components';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { FC, useCallback, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import getClient, { usePreviewSubscription } from '../lib/sanity';
import { Article } from '../schema/article';
import Queries from '../schema/queries';
import { Post, Recipe } from '../schema/root';

interface ArticlePreview {
  _id: string;
  _key: string;
  slug: string;
  title: string;
  tagline: string;
  image?: string;
}

const PostPreview: FC<{ article: ArticlePreview }> = ({ article }) => {
  const PANEL_HEIGHT = 200;
  const PANEL_WIDTH = 280;

  const [titleHeight, setTitleHeight] = useState(0);
  const titleRef = useCallback((node) => {
    if (node) {
      setTitleHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const [taglineHeight, setTaglineHeight] = useState(0);
  const taglineRef = useCallback((node) => {
    if (node) {
      setTaglineHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const vStart = PANEL_HEIGHT - titleHeight;
  const vFinish = vStart - taglineHeight;

  const hoverTransition = {
    '> div': {
      top: `${vFinish}px`,
    },
  };

  const hoverStyles = article.tagline
    ? {
      ':hover': hoverTransition,
      ':focus': hoverTransition,
    }
    : {};

  return (
    <Link href={`/${article.slug}`}>
      <Button
        p='0px'
        sx={{
          border: '1px solid black',
          backgroundImage: article.image && `url(${article.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '0px',
          height: PANEL_HEIGHT,
          width: PANEL_WIDTH,
        }}
      >
        <Box
          sx={{
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            ...hoverStyles,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: `${vStart}px`,
              transition: 'top .1s ease',
              width: '100%',
            }}
          >
            <Box
              bg='rgba(0,0,0,0.6)'
              ref={titleRef}
              p={1}
            >
              <Text
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                {article.title}
              </Text>
            </Box>
            {article.tagline && (
              <Box
                bg='rgba(0,0,0,0.8)'
                ref={taglineRef}
                px={1}
                py={2}
                sx={{
                  maxHeight: vStart,
                }}
              >
                <Text>
                  {article.tagline}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Button>
    </Link>
  );
};

type IndexInitialProps = {
  preview?: boolean;
  data: {
    articles: ArticlePreview[];
  };
};

export const getStaticProps: GetStaticProps<IndexInitialProps> = async ({ preview }) => {
  const articles = await getClient().fetch<ArticlePreview[]>(Queries.listArticles);
  console.log(articles);
  return {
    props: {
      data: {
        articles,
      },
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
};

const IndexPage: FC<IndexInitialProps> = ({ preview, data: initialData }) => {
  const { data: { articles } } = usePreviewSubscription(Queries.listArticles, {
    initialData,
    enabled: preview,
  });

  return (
    <Layout>
      <SEO title='Home' />
      <Flex
        sx={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        {articles.map((p) => (
          <PostPreview key={p._key || p._id} article={p} />
        ))}
      </Flex>
    </Layout>
  );
};

export default IndexPage;
