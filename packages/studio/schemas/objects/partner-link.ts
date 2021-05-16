import SchemaTypes from '../types';

const PartnerLink = {
  name: SchemaTypes.PartnerLink,
  title: 'Partner Link',
  type: 'object',
  fields: [
    {
      name: 'who',
      title: 'Who',
      type: 'reference',
      to: { type: SchemaTypes.Partner },
    },
  ],
};

export default PartnerLink;
