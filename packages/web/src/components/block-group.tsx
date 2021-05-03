/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Box } from 'theme-ui';
import { BlockContent, isBlockEmbedInstagram, isBlockImage, isBlockRecipeStep, isBlockText } from '../schema/block';
import { ARTICLE_GUTTER } from '../theme';
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
      if (isBlockEmbedInstagram(b)) {
        return (
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <style>
              {`
#ig-embed-${b._key} > iframe {
  margin: 0 auto !important;
}`}
            </style>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: b.code }}
              id={`ig-embed-${b._key}`}
            />
          </Box>
        );
      }

      // @ts-ignore <-- this is a fallback in case we haven't considered a case in our types
      console.warn('unhandled block type', b._type);
      return null;
    })}
  </>
);

export default BlockGroup;
