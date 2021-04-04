import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { Box, Flex, Heading, Image } from 'theme-ui';
import BlockGroup from '../components/block-group';
import BlockText from '../components/block-text';
import Layout from '../components/layout';
import SEO from '../components/seo';
import client from '../lib/apollo';
import { BlockContent, isBlockText } from '../schema/block';
import { Post, Recipe, RootQuery } from '../schema/root';


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
  console.debug('run getStaticPaths');

  const [posts, recipes] = await Promise.all([
    listPosts(),
    listRecipes(),
  ]);

  const allArticles = [...posts, ...recipes];
  const allPaths: string[] = [];

  allArticles.forEach((a) => {
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

type PostInitialProps = {
  slug: string;
  post: Post | Recipe;
};

export const getStaticProps: GetStaticProps<PostInitialProps> = async ({ params }) => {
  const { data, error } = await client.query<RootQuery>({
    query: postSlugQuery,
    variables: {
      slug: params.slug,
    },
  });

  const [post] = data?.allPost || [];
  if (!post || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: params.slug as string,
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
};

const Article: FC<WithRouterProps & PostInitialProps> = ({ slug, post, router, ...props }) => {
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [mainImageDimensions, setMainImageDimensions] = useState<[number, number]>([0, 0]);
  const isMainImagePortrait = mainImageDimensions[0] > mainImageDimensions[1];

  const mainImageRef = useCallback((node) => {
    if (node) {
      const { height, width } = node.getBoundingClientRect();
      setMainImageDimensions([height, width]);
    }
  }, [mainImageLoaded]);

  // when the article has not been pre-rendered at build time, we will try to fetch it dynamically on the server
  // by running getStaticProps and showing fallback page here
  if (router.isFallback) {
    // todo: implement loading placeholder for the dynamic article
    return <div>loading........</div>;
  }

  const content = (post?.contentRaw || []) as BlockContent[];
  const [firstBlock, ...restBlocks] = content;

  return (
    <Layout stickyHeader>
      <SEO title={post?.title} />
      {post && (
        <Box
          px={3}
          py={4}
        >
          <Flex
            mb={3}
            sx={{
              flexDirection: isMainImagePortrait ? 'row' : 'column',
              flexWrap: 'wrap',
            }}
          >
            {post.mainImage && (
              <Box
                mr={isMainImagePortrait ? 4 : '0px'}
                sx={{
                  flex: '0 0 auto',
                }}
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
              mb={4}
              sx={{
                flex: isMainImagePortrait ? '1 0 480px' : '0 0 auto',
              }}
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
              {isMainImagePortrait && isBlockText(firstBlock) && (
                <BlockText content={firstBlock} variant='post-intro' />
              )}
            </Box>
          </Flex>

          <BlockGroup
            key={post._id}
            blocks={isMainImagePortrait ? restBlocks : content}
          />
        </Box>
      )}
    </Layout>
  );
};

export default withRouter(Article);
