import SchemaTypes from './types';

const RecipeIngredient = {
  name: SchemaTypes.RecipeIngredient,
  title: 'Recipe Ingredient',
  type: 'object',
  fields: [
    {
      name: 'amount',
      title: 'Amount',
      type: 'string',
    },
    {
      name: 'ingredient',
      title: 'Ingredient',
      type: 'string',
    },
    {
      name: 'note',
      title: 'Note',
      type: 'string',
    },
  ],
  preview: {
    select: {
      amount: 'amount',
      ingredient: 'ingredient',
    },
    prepare: ({ amount, ingredient }) => ({
      title: `${amount} x ${ingredient}`,
    }),
  },
};

export default RecipeIngredient;
