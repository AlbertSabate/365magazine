import type { RouteComponentProps } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Text } from 'rebass';
import { BlockGroup } from '../block';
import Image from '../image';
import SEO from '../seo';


export const query = graphql`
  query AllPosts {
    allSanityPost {
      nodes {
        id
        title
        content {
          _key
          _type
          style
          children {
            _key
            _type
            marks
            text
          }
        }
      }
    }
  }
`;


interface QueryResponse {
  allSanityPost: {
    nodes: Array<{
      id: string;
      title: string;
      content: any;
    }>;
  };
}

const Home: FC<RouteComponentProps> = () => {
  const data: QueryResponse = useStaticQuery(query);

  return (
    <>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <Text
        sx={{
          color: 'red',
          fontSize: 30,
        }}
      >
        test
      </Text>
      {data && (
        <BlockGroup blocks={data.allSanityPost.nodes[0].content} />
      )}
    </>
  );
};

export default Home;
