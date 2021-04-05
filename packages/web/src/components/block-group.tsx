/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Flex } from 'theme-ui';
import { BlockContent, isBlockImage, isBlockRecipeStep, isBlockText } from '../schema/block';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';
import BlockImage from './block-image';
import BlockRecipeStep from './block-recipe-step';
import BlockText from './block-text';


type BlockGroupProps = SpaceProps & {
  blocks: Array<BlockContent>;
};

const BlockGroup: FC<BlockGroupProps> = ({ blocks, ...props }) => (
  <>
    {blocks.map((b) => {
      // using if-statements here as the type guards don't agree with switch-statements
      if (isBlockRecipeStep(b)) {
        return (
          <BlockRecipeStep
            content={b}
            key={b._key}
            px={ARTICLE_GUTTER}
            my={3}
            {...props}
          />
        );
      }
      if (isBlockImage(b)) {
        return (
          <BlockImage
            content={b}
            key={b._key}
            my={4}
            {...props}
          />
        );
      }
      if (isBlockText(b)) {
        return (
          <BlockText
            content={b}
            key={b._key}
            px={ARTICLE_GUTTER}
            {...props}
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
