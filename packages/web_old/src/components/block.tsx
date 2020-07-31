/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import React, { FC } from 'react';
import { Text, Heading } from 'rebass';


type HeadingTag = (
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
);

export type BlockStyle = HeadingTag | (
  | 'normal'
  | 'quote'
);

export interface BlockContent {
  _key: string;
  type: 'block';
  style?: BlockStyle;
  children: Array<{
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }>;
}

export const Block: FC<{ content: BlockContent }> = ({ content, ...props }) => {
  console.log(content);

  const El: FC = (() => {
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
            as="p"
            variant="p"
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
          as="span"
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
