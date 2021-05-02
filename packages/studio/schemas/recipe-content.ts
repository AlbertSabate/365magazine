import BlockContent from './block-content';
import SchemaTypes from './types';

const RecipeContent = {
  ...BlockContent,
  name: SchemaTypes.RecipeContent,
  of: [
    ...BlockContent.of,
    { type: SchemaTypes.RecipeStep },
  ],
};

export default RecipeContent;
