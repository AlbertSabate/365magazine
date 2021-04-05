import type * as CSS from 'csstype';
import { Theme } from 'theme-ui';
import colors from './colors';


type FontsNames = ('body' | 'heading' | 'display');

type AppTheme = Theme & {
  fonts: { [K in FontsNames]: CSS.Property.FontFamily };
  fontWeights: { [K in FontsNames]: number };
  lineHeights: { [K in FontsNames]: CSS.Property.LineHeight<string | 0 | number> };
};

export const ARTICLE_GUTTER = 3;
export const ARTICLE_WIDTH = 680;

const theme: AppTheme = {
  space: [4, 9, 15, 22, 28, 34, 48],
  fontSizes: {
    sm: 15,
    md: 19,
    lg: 22,
    xl: 32,
    xxl: 38,
  },
  colors,
  fonts: {
    body: '"Radley", serif',
    heading: '"Montserrat", sans-serif',
    display: '"Playfair Display", serif',
  },
  fontWeights: {
    body: 300,
    heading: 700,
    display: 400,
  },
  lineHeights: {
    body: 1.3,
    heading: 1.2,
    display: 1.5,
  },
  text: {
    'drop-cap': {
      float: 'left',
      fontSize: '64px',
      lineHeight: '70px',
      margin: '-4px 8px 0 -4px',
    },
    'post-intro': {
      fontFamily: 'heading',
      fontSize: 'lg',
      lineHeight: 'display',
    },
    'nav-logo': {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: '42px',
      color: 'black',
      letterSpacing: '-2px',
      lineHeight: 'display',
    },
    nav: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: 'md',
      lineHeight: 'body',
    },
    p: {
      marginBottom: 1,
      fontSize: 'md',
      lineHeight: 'body',
    },
    li: {
      fontSize: 'md',
      lineHeight: 'body',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'body',
      lineHeight: 'heading',
      fontSize: 'xxl',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 'xl',
    },
    h3: {
      fontFamily: 'display',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 'lg',
      marginTop: 4,
      marginBottom: 2,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 'md',
      marginTop: 3,
      marginBottom: 1,
    },
  },
};

export default theme;
