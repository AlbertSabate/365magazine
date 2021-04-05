/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Box, Flex, SxStyleProp, Text } from 'theme-ui';
import { BlockRecipeStepContent } from '../schema/block';
import BlockText from './block-text';


type BlockRecipeStepProps = SpaceProps & {
  content: BlockRecipeStepContent;
  sx?: SxStyleProp;
};

function padStepNumber(step: number): number {
  switch (step) {
    case 3:
    case 4:
    case 5:
      return 8;
    case 6:
      return -1;
    case 7:
      return 10;
    case 8:
      return -2;
    default:
      return 5;
  }
}

const BlockRecipeStep: FC<BlockRecipeStepProps> = ({ content: { step, content }, sx, ...props }) => (
  <Flex
    sx={{
      ...sx,
      flexDirection: 'row',
      alignItems: 'center',
    }}
    {...props}
  >
    <Box
      mr={3}
      pb={`${padStepNumber(step)}px`}
    >
      <Text
        as='span'
        sx={{
          fontSize: 'xl',
        }}
      >
        {step}
      </Text>
    </Box>
    {content.map((b) => <BlockText content={b} key={b._key} variant='li' />)}
  </Flex>
);

export default BlockRecipeStep;
