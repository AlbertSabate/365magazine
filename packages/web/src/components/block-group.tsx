import { FC } from 'react';
import { BlockContent, isBlockImage, isBlockRecipeStep, isBlockText } from '../schema/block';
import BlockImage from './block-image';
import BlockRecipeStep from './block-recipe-step';
import BlockText from './block-text';


const BlockGroup: FC<{ blocks: Array<BlockContent> }> = ({ blocks }) => (
  <>
    {blocks.map((b) => {
      // using if-statements here as the type guards don't agree with switch-statements
      if (isBlockRecipeStep(b)) {
        return (
          <BlockRecipeStep
            content={b}
            key={b._key}
            mx={3}
          />
        );
      }
      if (isBlockImage(b)) {
        return <BlockImage content={b} key={b._key} />;
      }
      if (isBlockText(b)) {
        return (
          <BlockText
            content={b}
            key={b._key}
            mx={3}
          />
        );
      }

      // @ts-ignore <-- this is a fallback in case we haven't considered a case in our types
      console.warn('unhandled block type', b._type);
      return null;
    })}
  </>
);

export default BlockGroup;
