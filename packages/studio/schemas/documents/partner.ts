import { MdPerson } from 'react-icons/md';
import slugify from '../../lib/slugify';
import SchemaTypes from '../types';

const Partner = {
  name: SchemaTypes.Partner,
  title: 'Partner',
  type: 'document',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: slugify('partner'),
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: SchemaTypes.ImageSimple,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'instagram',
      media: 'image',
    },
  },
};

export default Partner;
