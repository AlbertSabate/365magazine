import SchemaTypes from '../types';

const EmbedInstagram = {
  name: SchemaTypes.EmbedInstagram,
  title: 'Embed Code',
  description: 'Copy the embed code here from instagram',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Embed Code',
      type: 'string',
    },
  ],
  preview: {
    select: {
      code: 'code',
    },
    prepare({ code }) {
      if (!code) {
        return { title: 'Select dropdown to add IG Embed' };
      }
      const igTagStart = code.indexOf('@');
      const trimStart = code.substr(igTagStart);
      const igTagEnd = trimStart.indexOf(')');
      const trimEnd = trimStart.substr(0, igTagEnd);
      return { title: `IG Embed from: ${trimEnd}` };
    },
  },
};

export default EmbedInstagram;
