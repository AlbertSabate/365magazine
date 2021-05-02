import { MdPerson } from 'react-icons/md';
import { SimpleBlock } from './block-content';
import SchemaTypes from './types';

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
        slugify: (input) => 'author/'.concat(
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
        ),
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: SchemaTypes.ImageSimple,
      options: { hotspot: false },
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
