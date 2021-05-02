import { MdDescription } from 'react-icons/md';
import SchemaTypes from '../types';

const Recipe = {
  name: SchemaTypes.Recipe,
  title: 'Recipe',
  type: 'document',
  icon: MdDescription,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: SchemaTypes.AuthorLink,
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: SchemaTypes.ImageSimple,
      options: { hotspot: false },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: SchemaTypes.Category } }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: SchemaTypes.Tag } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'recipeInfo',
      title: 'Recipe Info',
      type: SchemaTypes.RecipeInfo,
    },
    {
      name: 'content',
      title: 'Content',
      type: SchemaTypes.RecipeContent,
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.who.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
};

export default Recipe;
