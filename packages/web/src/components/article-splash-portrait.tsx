import { Box, Flex, Heading, Image } from '@theme-ui/components';
import { FC } from 'react';
import { Article } from '../schema/article';
import { BlockContent, isBlockText } from '../schema/block';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';
import BlockText from './block-text';


type ArticleSplashProps = {
  article: Article;
};

const ArticleSplashPortrait: FC<ArticleSplashProps> = ({ article, children }) => {
  const content = (article?.content || []) as BlockContent[];
  const [firstBlock] = content;

  return (
    <Flex
      mx='auto'
      mb={3}
      px={ARTICLE_GUTTER}
      sx={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '874px',
        justifyContent: 'center',
      }}
    >
      {article.mainImage && (
        <Box
          mx={2}
          mb={6}
          sx={{
            flex: '0 0 auto',
          }}
        >
          <Image
            src={article.mainImage.url}
            sx={{
              maxHeight: '50vh',
            }}
          />
        </Box>
      )}
      <Flex
        mx='auto'
        px={ARTICLE_GUTTER}
        pb='7%'
        sx={{
          flex: '1 0 360px',
          maxWidth: `${ARTICLE_WIDTH}px`,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Heading
          as='h1'
          variant='h1'
          mt={2}
        >
          {article.title}
        </Heading>
        <Heading
          as='h2'
          variant='h3'
          mb={5}
        >
          {article.tagline}
        </Heading>
        {isBlockText(firstBlock) && (
          <BlockText
            content={firstBlock}
            variant='post-intro'
            dropCap
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ArticleSplashPortrait;
