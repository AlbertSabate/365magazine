import SchemaTypes from '../types';

const AuthorLink = {
  name: SchemaTypes.AuthorLink,
  title: 'Author Link',
  type: 'object',
  fields: [
    {
      name: 'who',
      title: 'Who',
      type: 'reference',
      to: { type: SchemaTypes.Author },
    },
    {
      name: 'addFeature',
      title: 'Add Feature?',
      type: 'boolean',
    },
  ],
};

export default AuthorLink;
