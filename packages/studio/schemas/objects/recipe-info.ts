import SchemaTypes from '../types';

const RecipeInfo = {
  name: SchemaTypes.RecipeInfo,
  title: 'Recipe Info',
  type: 'object',
  fields: [
    {
      name: 'makes',
      title: 'Makes (amount)',
      type: 'string',
    },
    {
      name: 'serves',
      title: 'Serves (people)',
      type: 'string',
    },
    {
      name: 'cookingTime',
      title: 'Cooking Time',
      type: 'string',
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: SchemaTypes.RecipeIngredient }],
    },
  ],
};

export default RecipeInfo;
