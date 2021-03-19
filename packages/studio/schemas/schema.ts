// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator';
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type';
import LandingConfig from './landing-config';

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
import RecipeIngredient from './recipe-ingredient';
import RecipeStepContent from './recipe-step-content';
import SiteConfig from './site-config';
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
    SiteConfig,
    LandingConfig,
    // other objects
    AuthorLink,
    BlockContent,
    RecipeStep,
    RecipeStepContent,
    RecipeIngredient,
  ]),
});
