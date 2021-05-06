/* eslint-disable react/jsx-props-no-spreading */
import { Box, Flex, Heading, Text } from '@theme-ui/components';
import { FC } from 'react';
import { RecipeIngredient } from '../schema/root';


const IngredientRow: FC<RecipeIngredient> = ({ amount, ingredient, note }) => (
  <Flex
    mb={3}
    sx={{
      flexDirection: 'column',
    }}
  >
    <Flex
      sx={{
        flexDirection: 'row',
      }}
    >
      <Box
        pr={1}
        sx={{
          flex: '0 0 80px',
        }}
      >
        <Text
          variant='table-cell'
          sx={{
            // fontSize: 'lg',
            textAlign: 'right',
          }}
        >
          {amount}
        </Text>
      </Box>
      <Box>
        <Text
          variant='table-cell'
        >
          {ingredient}
        </Text>
      </Box>
    </Flex>
    {note && (
      <Box py={1} px={5}>
        <Text
          sx={{
            fontSize: 'sm',
            fontFamily: 'heading',
            fontWeight: 400,
          }}
        >
          {note}
        </Text>
      </Box>
    )}
  </Flex>
);

type ArticleRecipeIngredientsProps = {
  ingredients: RecipeIngredient[];
};

const ArticleRecipeIngredients: FC<ArticleRecipeIngredientsProps> = ({ ingredients, children }) => (
  <>
    <Heading
      as='h4'
      variant='h4'
      mb={2}
    >
      Ingredients
    </Heading>
    <Box>
      {ingredients.map((i) => <IngredientRow {...i} key={i._key} />)}
    </Box>
  </>
);

export default ArticleRecipeIngredients;

