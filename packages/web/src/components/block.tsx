/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import React, { FC } from 'react';
import { Text, Heading, Image } from 'theme-ui';
import { SANITY_PROJECT } from '../lib/with-apollo';
import { BlockContent, HeadingTag, isBlockImage } from '../schema/block';
import imageUrlBuilder from '@sanity/image-url';


const builder = imageUrlBuilder(SANITY_PROJECT);

export const Block: FC<{ content: BlockContent; variant?: string }> = ({ content, variant, ...props }) => {
  if (isBlockImage(content)) {
    return (
      <Image src={builder.image(content.asset).url()} />
    );
  }

  const El: FC = (() => {
    // if (content.listItem) {
    //   return (
    //
    //   )
    // }

    switch (content.style) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
        return ({ children }) => (
          <Heading
            as={content.style as HeadingTag}
            variant={content.style}
            {...props}
          >
            {children}
          </Heading>
        );
      case 'normal':
      default:
        return ({ children }) => (
          <Text
            as='p'
            variant={variant || 'p'}
            {...props}
          >
            {children}
          </Text>
        );
    }
  })();

  return (
    <El>
      {content.children.map((c) => (
        <Text
          as='span'
          key={c._key}
          sx={{
            fontWeight: c.marks.includes('strong') ? 'bold' : undefined,
          }}
        >
          {c.text}
        </Text>
      ))}
    </El>
  );
};

export const BlockGroup: FC<{ blocks: Array<BlockContent> }> = ({ blocks }) => (
  <>
    {blocks.map((b) => <Block content={b} key={b._key} />)}
  </>
);
