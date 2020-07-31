import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React, { FC } from 'react';
import { Image, Text } from 'rebass';
import { BlockGroup } from '../components/block';
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

  return (
    <Layout>
      <SEO title={post?.title} />
      {post && (
        <>
          <h1>{post.title}</h1>
          <Text>
            {post.tagline}
          </Text>
          {post.mainImage && (
            <Image
              src={post.mainImage.asset.url}
              sx={{
                maxHeight: '50vh',
              }}
            />
          )}
          <BlockGroup key={post._id} blocks={post.contentRaw} />
        </>
      )}
    </Layout>
  );
};

export default withApollo({})(withRouter(Post));
