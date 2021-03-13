// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator';
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type';
import AuthorLink from './author-link';

/* eslint-disable import/extensions */
// @ts-ignore
import RecipeStep from './recipe-step.tsx';
/* eslint-enable import/extensions */

import blockContent from './blockContent';
import Category from './category';
import Post from './post';
import Recipe from './recipe';
import Author from './author';
import RecipeIngredient from './recipe-ingredient';
import RecipeStepContent from './recipe-step-content';
import Tag from './tag';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // documents
    Author,
    Category,
    Tag,
    Post,
    Recipe,
    // other objects
    AuthorLink,
    blockContent,
    RecipeStep,
    RecipeStepContent,
    RecipeIngredient,
  ]),
});
