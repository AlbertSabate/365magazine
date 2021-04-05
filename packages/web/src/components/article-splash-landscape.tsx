import { FC } from 'react';
import { Box, Heading, Image } from 'theme-ui';
import { Article } from '../schema/article';
import { BlockContent, isBlockText } from '../schema/block';
import { ARTICLE_GUTTER, ARTICLE_WIDTH } from '../theme';
import BlockText from './block-text';


type ArticleSplashProps = {
  article: Article;
};

const ArticleSplashLandscape: FC<ArticleSplashProps> = ({ article, children }) => {
  const content = (article?.contentRaw || []) as BlockContent[];
  const [firstBlock] = content;

  return (
    <>
      <Box
        mb={3}
      >
        {article.mainImage && (
          <Image
            src={article.mainImage.asset.url}
            mx='auto'
            mb={4}
            sx={{
              display: 'block',
              maxHeight: '40vh',
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100%',
              maxWidth: '840px',
            }}
          />
        )}
        <Box
          mx='auto'
          px={ARTICLE_GUTTER}
          sx={{
            maxWidth: `${ARTICLE_WIDTH}px`,
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
        </Box>
      </Box>
      {isBlockText(firstBlock) && (
        <BlockText
          content={firstBlock}
          variant='post-intro'
          dropCap
        />
      )}
    </>
  );
};

export default ArticleSplashLandscape;
