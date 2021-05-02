// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator';
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type';

/* eslint-disable import/extensions */
// @ts-ignore
import RecipeStep from './recipe-step.tsx';
/* eslint-enable import/extensions */

import BlockContent from './block-content';
import Category from './category';
import Post from './post';
import Author from './author';
import AuthorLink from './author-link';
import Recipe from './recipe';
import RecipeInfo from './recipe-info';
import RecipeIngredient from './recipe-ingredient';
import RecipeStepContent from './recipe-step-content';
import RecipeContent from './recipe-content';
import LandingConfig from './landing-config';
import SiteConfig from './site-config';
import Tag from './tag';
import ImageSimple from './image-simple';

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
