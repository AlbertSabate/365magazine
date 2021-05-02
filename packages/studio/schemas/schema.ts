// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator';
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type';

/* eslint-disable import/extensions */
// @ts-ignore
import RecipeStep from './objects/recipe-step.tsx';
/* eslint-enable import/extensions */

import BlockContent from './objects/block-content';
import Category from './documents/category';
import Post from './documents/post';
import Author from './documents/author';
import AuthorLink from './objects/author-link';
import Recipe from './documents/recipe';
import RecipeInfo from './objects/recipe-info';
import RecipeIngredient from './objects/recipe-ingredient';
import RecipeStepContent from './objects/recipe-step-content';
import RecipeContent from './objects/recipe-content';
import LandingConfig from './landing-config';
import SiteConfig from './site-config';
import Tag from './documents/tag';
import ImageSimple from './objects/image-simple';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // documents
    Author,
    Category,
    Tag,
    Post,
    Recipe,
    SiteConfig,
    LandingConfig,
    // other objects
    ImageSimple,
    AuthorLink,
    BlockContent,
    RecipeInfo,
    RecipeStep,
    RecipeStepContent,
    RecipeIngredient,
    RecipeContent,
  ]),
});
