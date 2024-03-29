import { MdPerson } from 'react-icons/md';
import slugify from '../../lib/slugify';
import { SimpleBlock } from '../objects/block-content';
import SchemaTypes from '../types';

const Author = {
  name: SchemaTypes.Author,
  title: 'Author',
  type: 'document',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
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
        slugify: slugify('author'),
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: SchemaTypes.ImageSimple,
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        SimpleBlock,
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
};

export default Author;
