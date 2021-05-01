import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { FC, useCallback, useState } from 'react';
import { Box, Button, Flex, Text } from 'theme-ui';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Queries from '../schema/queries';
import { Post, Recipe, RootQuery } from '../schema/root';


const PostPreview: FC<{ post: Post | Recipe }> = ({ post }) => {
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

  const hoverStyles = post.tagline
    ? {
      ':hover': hoverTransition,
      ':focus': hoverTransition,
    }
    : {};

  return (
    <Link href={`/${post.slug.current}`}>
      <Button
        p='0px'
        sx={{
          border: '1px solid black',
          backgroundImage: post.mainImage && `url(${post.mainImage.asset.url})`,
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
                {post.title}
              </Text>
            </Box>
            {post.tagline && (
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
                  {post.tagline}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Button>
    </Link>
  );
};

const IndexPage: FC = (props) => {
  const { data: categoriesData } = useQuery<RootQuery>(Queries.listCategories);
  const { data: authorsData } = useQuery<RootQuery>(Queries.listAuthors);
  const { data: postsData } = useQuery<RootQuery>(Queries.listPosts);
  const { data: recipesData } = useQuery<RootQuery>(Queries.listRecipes);

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
        {(postsData?.allPost || []).map((p) => (
          <PostPreview key={p._key || p._id} post={p} />
        ))}
        {(recipesData?.allRecipe || []).map((p) => (
          <PostPreview key={p._key || p._id} post={p} />
        ))}
      </Flex>
    </Layout>
  );
};

export default IndexPage;
