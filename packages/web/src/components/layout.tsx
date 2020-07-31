import React, { FC } from 'react';
import { Box } from 'rebass';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'theme-ui';
import Header from './header';
import ResetCss from './reset-css';
import theme from '../theme';


const Layout: FC = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <ResetCss />
      <ThemeProvider theme={theme}>
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
        <Header />
        <Box>
          <main>{children}</main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
