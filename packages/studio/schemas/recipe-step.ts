import SchemaTypes from './types';

const RecipeStep = {
  name: SchemaTypes.RecipeStep,
  title: 'Recipe Step',
  type: 'object',
  fields: [
    {
      name: 'step',
      title: 'Step',
      type: 'number',
    },
    {
      name: 'content',
      title: 'Content',
      type: SchemaTypes.RecipeStepContent,
    }
  ]
}

export default RecipeStep;
