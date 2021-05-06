/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import { Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { ElementType, FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { BlockTextContent, BlockTextContentChildren, MarkDefLink } from '../schema/block';


type BlockTextProps = SpaceProps & {
  content: BlockTextContent;
  variant?: string;
  sx?: ThemeUIStyleObject;
  dropCap?: boolean;
  as?: ElementType;
};

function formatWithDropCap(children: Array<BlockTextContentChildren>) {
  const [firstPart, ...otherParts] = children;
  const firstLetter = firstPart.text.substr(0, 1);
  const restFirstPart = firstPart.text.substr(1);

  const remappedFirstPart = {
    ...firstPart,
    text: restFirstPart,
  };

  const dropCapPart = {
    _key: firstPart._key.concat('-initial'),
    _type: 'drop-cap',
    marks: [],
    text: firstLetter,
  };

  return [dropCapPart, remappedFirstPart, ...otherParts];
}

const WithLink: FC<{ linkDef?: MarkDefLink }> = ({ children, linkDef }) => (
  linkDef
    ? (
      <a href={linkDef.href}>{children}</a>
    )
    : (
      <>{children}</>
    )
);

const BlockTextElement: FC<BlockTextProps> = ({ content, sx, as = 'p', variant, children, ...props }) => {
  const styles: ThemeUIStyleObject = {
    ...sx,
  };

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
      return (
        <Heading
          as={content.style}
          variant={content.style}
          sx={styles}
          mx='auto'
          {...props}
        >
          {children}
        </Heading>
      );
    case 'normal':
    default:
      return (
        <Text
          as={as}
          variant={variant || 'p'}
          sx={styles}
          {...props}
        >
          {children}
        </Text>
      );
  }
};

const BlockText: FC<BlockTextProps> = (props) => {
  const { content, dropCap } = props;
  const renderContent = dropCap ? formatWithDropCap(content.children) : content.children;

  return (
    <BlockTextElement {...props}>
      {renderContent.map((c) => {
        const customMarks = c.marks.filter((m) => !['em'].includes(m));
        const markDefs = customMarks
          .map((k) => content.markDefs.find(({ _key }) => _key === k))
          .filter((d) => !!d);

        return (
          <Text
            as={c.marks.includes('em') ? 'em' : 'span'}
            key={c._key}
            sx={{
              fontWeight: c.marks.includes('strong') ? 'bold' : undefined,
            }}
            variant={c._type === 'drop-cap' ? 'drop-cap' : undefined}
          >
            <WithLink linkDef={markDefs.find((d) => d._type === 'link')}>
              {c.text}
            </WithLink>
          </Text>
        );
      })}
    </BlockTextElement>
  );
};

export default BlockText;
