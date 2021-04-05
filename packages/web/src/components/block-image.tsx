/* eslint-disable react/jsx-props-no-spreading */
import imageUrlBuilder from '@sanity/image-url';
import { FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Flex, Image } from 'theme-ui';
import { SANITY_PROJECT } from '../lib/apollo';
import { BlockImageContent } from '../schema/block';


const builder = imageUrlBuilder(SANITY_PROJECT);

type BlockImageProps = SpaceProps & {
  content: BlockImageContent;
};

const BlockImage: FC<BlockImageProps> = ({ content, ...props }) => (
  <Flex
    sx={{
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
        maxHeight: '35vh',
        objectFit: 'cover',
        objectPosition: 'center center',
      }}
      src={builder.image(content.asset).url()}
    />
  </Flex>
);

export default BlockImage;
