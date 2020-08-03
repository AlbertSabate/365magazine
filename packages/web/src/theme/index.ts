import { Globals } from 'csstype';
import { Theme } from 'theme-ui';
import type * as CSS from 'csstype';
import colors from './colors';


type FontsNames = ('body' | 'heading' | 'display');

type StandardProps = Omit<CSS.StandardProperties, (
  | 'fontWeight'
  | 'fontSize'
  | 'marginBottom'
)> & {
  fontWeight?: number | FontsNames;
  fontSize?: Globals | number | string | FontsNames;
  marginTop?: number | string;
  marginBottom?: number | string;
};

type AppTheme = Theme & {
  fonts: { [K in FontsNames]: CSS.FontFamilyProperty };
  fontWeights: { [K in FontsNames]: number };
  lineHeights: { [K in FontsNames]: CSS.LineHeightProperty<string | 0 | number> };
  text: { [K in string]: StandardProps };
};

const theme: AppTheme = {
  space: [4, 9, 15, 22, 28, 34, 48],
  fontSizes: [13, 15, 18, 22, 24, 28, 32, 36, 48],
  colors,
  fonts: {
    body: '"Montserrat", sans-serif',
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
    'post-intro': {
      fontFamily: 'body',
      fontSize: 2,
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
      fontSize: 2,
      lineHeight: 'body',
    },
    p: {
      marginBottom: 1,
      fontSize: 1,
      lineHeight: 'body',
    },
    h1: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'heading',
      fontSize: 8,
      textTransform: 'uppercase',
      marginBottom: 3,
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 6,
    },
    h3: {
      fontFamily: 'display',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 5,
      marginTop: 4,
      marginBottom: 2,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 2,
      marginTop: 3,
      marginBottom: 1,
    },
  },
};

export default theme;
