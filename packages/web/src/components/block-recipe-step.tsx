/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Box, Flex, SxStyleProp } from 'theme-ui';
import { BlockRecipeStepContent } from '../schema/block';
import BlockText from './block-text';


type BlockRecipeStepProps = SpaceProps & {
  content: BlockRecipeStepContent;
  sx?: SxStyleProp;
};

const BlockRecipeStep: FC<BlockRecipeStepProps> = ({ content: { step, content }, sx, ...props }) => (
  <Flex
    sx={{
      ...sx,
      flexDirection: 'row',
    }}
    {...props}
  >
    <Box>
      {step}
    </Box>
    <Box>
      {content.map((b) => <BlockText content={b} key={b._key} />)}
    </Box>
  </Flex>
);

export default BlockRecipeStep;
