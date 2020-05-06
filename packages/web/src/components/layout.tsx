import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Box } from 'rebass';
import Header from './header';
import ResetCss from './reset-css';


const Layout: FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Box>
        <main>{children}</main>
      </Box>
      <ResetCss />
    </>
  );
};

export default Layout;
