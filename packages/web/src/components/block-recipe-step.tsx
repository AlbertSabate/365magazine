import { FC } from 'react';
import { Box, Flex } from 'theme-ui';
import { BlockRecipeStepContent } from '../schema/block';
import BlockText from './block-text';


const BlockRecipeStep: FC<{ content: BlockRecipeStepContent }> = ({ content: { step, content } }) => (
  <Flex
    sx={{
      flexDirection: 'row',
    }}
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
