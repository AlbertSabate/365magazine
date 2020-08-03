import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box } from 'rebass';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'theme-ui';
import Header from './header';
import ResetCss from './reset-css';
import theme from '../theme';


const isServer = typeof window === 'undefined';

type LayoutProps = {
  stickyHeader?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, stickyHeader }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  const [headerHeight, setHeaderHeight] = useState(108);
  const headerRef = useCallback((node) => {
    if (node) {
      setHeaderHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [memoScroll, setMemoScroll] = useState(scrollPosition);
  const [isScrollingDown, setScrollingDown] = useState(false);

  const scrollListener = () => {
    setScrollPosition(window.scrollY);
  };

  if (!isServer) {
    window.removeEventListener('scroll', scrollListener);
    window.addEventListener('scroll', scrollListener);

    useEffect(() => {
      const diff = scrollPosition - memoScroll;
      if (Math.abs(diff) > 0.5 * headerHeight) {
        setScrollingDown(diff > 0);
        // console.debug('setting scroll memo:', scrollPosition, 'direction:', (diff > 0) ? 'down' : 'up');
        setMemoScroll(scrollPosition);
      }
    }, [scrollPosition]);
  }

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
        <Header
          sticky={stickyHeader}
          scrollingDown={isScrollingDown}
          headerHeight={headerHeight}
          ref={headerRef}
        />
        <Box
          pt={stickyHeader ? headerHeight : 0}
        >
          <main>{children}</main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
