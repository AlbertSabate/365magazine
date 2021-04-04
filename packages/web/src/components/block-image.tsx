import imageUrlBuilder from '@sanity/image-url';
import React, { FC } from 'react';
import { Image } from 'theme-ui';
import { SANITY_PROJECT } from '../lib/with-apollo';
import { BlockImageContent } from '../schema/block';


const builder = imageUrlBuilder(SANITY_PROJECT);

const BlockImage: FC<{ content: BlockImageContent }> = ({ content }) => (
  <Image src={builder.image(content.asset).url()} />
);

export default BlockImage;
