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
  fontSize?: number | FontsNames;
  marginBottom?: number | string;
};

type AppTheme = Theme & {
  fonts: { [K in FontsNames]: CSS.FontFamilyProperty };
  fontWeights: { [K in FontsNames]: number };
  lineHeights: { [K in FontsNames]: CSS.LineHeightProperty<string | 0 | number> };
  text: { [K in string]: StandardProps };
};

const theme: AppTheme = {
  space: [9, 15, 22, 28, 34, 48],
  fontSizes: [15, 18, 22, 24, 28, 32, 36, 48],
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
    body: 1.5,
    heading: 1.5,
    display: 1.5,
  },
  text: {
    p: {
      marginBottom: 1,
      fontSize: 1,
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 6,
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 5,
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 4,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: 3,
    },
  },
};

export default theme;
