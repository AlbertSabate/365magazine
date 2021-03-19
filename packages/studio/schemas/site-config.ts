import SchemaTypes from './types';

const SiteConfig = {
  name: SchemaTypes.SiteConfig,
  type: 'document',
  title: 'Global Site Configuration',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Meta Description',
    },
  ],
};

export default SiteConfig;
