// First, we must import the schema creator
// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import Category from './category';
import Post from './post';
import postTest from './post-test';
import Author from './author';
import RecipeStepContent from './recipe-step-content';
import Tag from './tag';
import RecipeStep from './recipe-step';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    Post,
    Author,
    Category,
    Tag,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    postTest,
    RecipeStep,
    RecipeStepContent,
  ]),
});
