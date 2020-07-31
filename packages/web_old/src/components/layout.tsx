import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { Box } from 'rebass';
import theme from '../gatsby-plugin-theme-ui';
import Header from './header';
import ResetCss from './reset-css';
import { Global } from '@emotion/core';


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
      <ResetCss />
      <Global
        styles={(t: typeof theme) => ({
          body: {
            fontFamily: t.fonts.body,
            fontSize: t.fontSizes[1] as number,
            fontWeight: t.fontWeights.body,
            lineHeight: t.lineHeights.body,
            '*': {
              boxSizing: 'border-box',
            },
            button: {
              cursor: 'pointer',
            },
          },
        })}
      />
      <Box>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
