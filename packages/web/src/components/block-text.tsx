/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import React, { FC } from 'react';
import { Heading, Text } from 'theme-ui';
import { BlockTextContent, HeadingTag } from '../schema/block';


const BlockText: FC<{ content: BlockTextContent; variant?: string }> = ({ content, variant, ...props }) => {
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
          as={c.marks.includes('em') ? 'em' : 'span'}
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

export default BlockText;
