import { Theme } from '@chakra-ui/react';
import type * as CSS from 'csstype';
import colors from './colors';


type FontsNames = ('body' | 'heading' | 'display');

type AppTheme = Theme & {
  fonts: { [K in FontsNames]: CSS.Property.FontFamily };
  fontWeights: { [K in FontsNames]: number };
  lineHeights: { [K in FontsNames]: CSS.Property.LineHeight<string | 0 | number> };
};

export const ARTICLE_GUTTER = 2;
export const ARTICLE_WIDTH = 680;

const theme: AppTheme = {
  space: [4, 9, 15, 22, 28, 34, 48],
  fontSizes: {
    sm: 15,
    md: 19,
    lg: 22,
    xl: 32,
    xxl: 42,
  },
  colors,
  fonts: {
    body: '"Radley", serif',
    heading: '"Montserrat", sans-serif',
    display: '"Playfair Display", serif',
    mono: '"Montserrat", sans-serif',
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
      // margin: '-4px 8px -2px -4px',
      margin: '-3px 7px -3px 0px',
    },
    'post-intro': {
      fontFamily: 'body',
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
      marginBottom: 3,
      fontSize: 'md',
      lineHeight: 'body',
    },
    li: {
      fontSize: 'md',
      lineHeight: 'body',
    },
    'table-cell': {
      fontSize: 'md',
      fontFamily: 'body',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'display',
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
      lineHeight: 'display',
      fontSize: 'lg',
      marginTop: 5,
      marginBottom: 6,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 'lg',
      marginTop: 3,
      marginBottom: 1,
    },
  },
};

export default theme;
