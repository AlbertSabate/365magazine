import { SimpleBlock } from './block-content';
import SchemaTypes from '../types';

const ImageSimple = {
  name: SchemaTypes.ImageSimple,
  title: 'Image',
  type: 'image',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'array',
      of: [
        SimpleBlock,
      ],
    },
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Important for SEO and accessibility.',
    },
  ],
};

export default ImageSimple;
