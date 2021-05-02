import { MdFolder } from 'react-icons/md';
import SchemaTypes from '../types';

const BlockContent = {
  name: SchemaTypes.Category,
  title: 'Category',
  type: 'document',
  icon: MdFolder,
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

export default BlockContent;
