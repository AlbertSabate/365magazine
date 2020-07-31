/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import React, { FC } from 'react';
import { Text, Heading } from 'rebass';
import { BlockContent, HeadingTag } from '../schema/block';


export const Block: FC<{ content: BlockContent }> = ({ content, ...props }) => {
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
            variant='p'
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
          fontWeight={c.marks.includes('strong') ? 'bold' : undefined}
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
