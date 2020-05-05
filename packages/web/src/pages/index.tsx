import { Link } from 'gatsby';
import React, { FC } from 'react';
import { Text } from 'rebass';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';


const IndexPage: FC = () => (
  <Layout>
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
  </Layout>
);

export default IndexPage;
