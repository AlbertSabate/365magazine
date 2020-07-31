import { Router } from '@reach/router';
import React, { FC } from 'react';
import Layout from '../components/layout';
import Home from '../components/pages/home';
import Post from './post';


const IndexPage: FC = () => (
  <Layout>
    <Router>
      <Home path="/" />
      <Post path="/post/:slug" />
    </Router>
  </Layout>
);

export default IndexPage;
