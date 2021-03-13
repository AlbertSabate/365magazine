import SchemaTypes from './types';

const BlockContent = {
  name: SchemaTypes.Category,
  title: 'Category',
  type: 'document',
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
