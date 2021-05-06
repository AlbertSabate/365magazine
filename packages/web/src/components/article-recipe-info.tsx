import { Box, Flex, Heading, Text } from '@theme-ui/components';
import { FC } from 'react';
import { RecipeInfo } from '../schema/root';


const InfoRow: FC<{ label: string; value: string }> = ({ label, value }) => (
  <Flex
    sx={{
      flexDirection: 'row',
    }}
  >
    <Box
      sx={{
        flex: '0 0 200px',
      }}
    >
      <Text>{label}</Text>
    </Box>
    <Box
      sx={{
        flex: '1 0 140px',
      }}
    >
      <Text>{value}</Text>
    </Box>
  </Flex>
);

type ArticleRecipeInfoProps = {
  info: RecipeInfo;
};

const ArticleRecipeInfo: FC<ArticleRecipeInfoProps> = ({ info, children }) => (
  <>
    <Heading
      as='h4'
      variant='h4'
      mb={2}
    >
      Recipe Info
    </Heading>
    <Box>
      {/* Cooking Time */}
      {info.cookingTime && <InfoRow label='Cooking Time' value={info.cookingTime} />}
      {/* Makes */}
      {info.makes && <InfoRow label='Makes' value={info.makes} />}
      {/* Serves */}
      {info.serves && <InfoRow label='Serves' value={info.serves} />}
    </Box>
  </>
);

export default ArticleRecipeInfo;
