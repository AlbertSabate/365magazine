import { ImPriceTag } from 'react-icons/im';
import SchemaTypes from '../types';

const Tag = {
  name: SchemaTypes.Tag,
  title: 'Tag',
  type: 'document',
  icon: ImPriceTag,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};

export default Tag;
