import SchemaTypes from './types';

const LandingConfig = {
  name: SchemaTypes.LandingConfig,
  type: 'document',
  title: 'Landing Page Configuration',
  fields: [
    {
      name: 'mainFeature',
      type: 'reference',
      to: [
        {
          type: SchemaTypes.Post,
        },
        {
          type: SchemaTypes.Recipe,
        },
      ],
    },
  ],
};

export default LandingConfig;
