/* eslint-disable react/jsx-props-no-spreading */
import { Box, Flex, Image } from '@theme-ui/components';
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { imageBuilder } from '../lib/sanity';
import { BlockImageContent } from '../schema/block';
import BlockText from './block-text';


type BlockImageProps = SpaceProps & {
  content: BlockImageContent;
};

const BlockImage: FC<BlockImageProps> = ({ content, ...props }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}
    {...props}
  >
    <Image
      sx={{
        width: '100%',
        height: 'auto',
        maxWidth: '680px',
        maxHeight: '42vh',
        objectFit: 'cover',
        objectPosition: 'center center',
      }}
      src={imageBuilder.image(content.asset).url()}
    />
    {content.caption && (
      <Box p={1}>
        {content.caption.map((b) => (
          <BlockText key={b._key} content={b} />
        ))}
      </Box>
    )}
  </Flex>
);

export default BlockImage;
