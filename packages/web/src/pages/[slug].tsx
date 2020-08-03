import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { FC, useCallback, useRef, useState } from 'react';
import { Box, Flex, Heading, Image, Text } from 'rebass';
import { Block, BlockGroup } from '../components/block';
import Layout from '../components/layout';
import SEO from '../components/seo';
import withApollo from '../lib/with-apollo';


const postSlugQuery = gql`
  query Post($slug: String) {
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

const Post: FC<WithRouterProps> = ({ router, ...props }) => {
  const { data, loading, error } = useQuery(postSlugQuery, {
    variables: {
      slug: router.query.slug,
    },
  });

  console.log(loading, data);
  const [post] = data?.allPost || [];

  if (!loading && !post) {
    router.replace('/404').catch(console.error);
  }

  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [mainImageDimensions, setMainImageDimensions] = useState<[number, number]>([0, 0]);
  const isMainImagePortrait = mainImageDimensions[0] > mainImageDimensions[1];

  const mainImageRef = useCallback((node) => {
    if (node) {
      const { height, width } = node.getBoundingClientRect();
      setMainImageDimensions([height, width]);
    }
  }, [mainImageLoaded]);

  const [firstBlock, ...restBlocks] = post?.contentRaw || [];

  console.log(post?.mainImage.asset.url);

  return (
    <Layout stickyHeader>
      <SEO title={post?.title} />
      {post && (
        <Box
          px={3}
          py={4}
        >
          <Flex
            flexDirection={isMainImagePortrait ? 'row' : 'column'}
            flexWrap='wrap'
            mb={3}
          >
            {post.mainImage && (
              <Box
                flex='0 0 auto'
                mr={isMainImagePortrait ? 4 : '0px'}
              >
                <Image
                  src={post.mainImage.asset.url}
                  ref={mainImageRef}
                  onLoad={() => setMainImageLoaded(true)}
                  sx={{
                    maxHeight: isMainImagePortrait ? '50vh' : undefined,
                    marginBottom: !isMainImagePortrait && 4,
                  }}
                />
              </Box>
            )}
            <Box
              flex={isMainImagePortrait ? '1 0 480px' : '0 0 auto'}
              mb={4}
            >
              <Heading
                as='h1'
                variant='h1'
              >
                {post.title}
              </Heading>
              <Heading
                as='h2'
                variant='h3'
              >
                {post.tagline}
              </Heading>
              {isMainImagePortrait && firstBlock && (
                <Block content={firstBlock} variant='post-intro' />
              )}
            </Box>
          </Flex>


          <BlockGroup
            key={post._id}
            blocks={isMainImagePortrait ? restBlocks : post.contentRaw}
          />
        </Box>
      )}
    </Layout>
  );
};

export default withApollo({})(withRouter(Post));
