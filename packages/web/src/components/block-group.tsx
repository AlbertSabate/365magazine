import React, { FC } from 'react';
import { BlockContent, getBlockType, isBlockImage, isBlockRecipeStep, isBlockText } from '../schema/block';
import BlockImage from './block-image';
import BlockText from './block-text';


const BlockGroup: FC<{ blocks: Array<BlockContent> }> = ({ blocks }) => (
  <>
    {blocks.map((b) => {
      // using if-statements here as the type guards don't agree with switch-statements

      if (isBlockRecipeStep(b)) {
        return null;
      }
      if (isBlockImage(b)) {
        return <BlockImage content={b}/>;
      }
      if (isBlockText(b)) {
        return <BlockText content={b} key={b._key}/>;
      }

      console.warn('unhandled block type', getBlockType(b));
      return null;
    })}
  </>
);

export default BlockGroup;
