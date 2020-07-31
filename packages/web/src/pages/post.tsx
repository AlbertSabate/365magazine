import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { BlockGroup } from '../components/block';


const queryPost = graphql`
  query Posts($slug: String) {
    allSanityPost(
      filter: { slug: { current: { eq: $slug } } }, 
      limit: 1,
    ) {
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

type Props = RouteComponentProps<{ slug: string }>;

const Post: FC<Props> = ({ slug, navigate }) => {
  console.log(slug);
  let article = null;
  try {
    const data = useStaticQuery(queryPost);
    console.log(data);
    [article] = data?.allSanityPost.nodes;
  } catch (err) {
    console.error(err);
    navigate('/404').catch(console.error);
  }

  if (!article) {
    return null;
  }

  return (
    <BlockGroup blocks={article.content} />
  );
};

export default Post;
