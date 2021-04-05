/* eslint-disable react/jsx-props-no-spreading,no-underscore-dangle */
import { ElementType, FC } from 'react';
import type { SpaceProps } from 'styled-system';
import { Heading, SxStyleProp, Text } from 'theme-ui';
import { BlockTextContent, HeadingTag } from '../schema/block';


type BlockTextProps = SpaceProps & {
  content: BlockTextContent;
  variant?: string;
  sx?: SxStyleProp;
  dropCap?: boolean;
  as?: ElementType;
};

const BlockText: FC<BlockTextProps> = ({ content, variant, sx, dropCap, as = 'p', ...props }) => {
  const styles: SxStyleProp = {
    ...sx,
  };

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
            sx={styles}
            mx='auto'
            {...props}
          >
            {children}
          </Heading>
        );
      case 'normal':
      default:
        return ({ children }) => (
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
  })();

  const formatWithDropCap = () => {
    const [firstPart, ...otherParts] = content.children;
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
  };

  const renderContent = dropCap ? formatWithDropCap() : content.children;

  return (
    <El>
      {renderContent.map((c) => (
        <Text
          as={c.marks.includes('em') ? 'em' : 'span'}
          key={c._key}
          sx={{
            fontWeight: c.marks.includes('strong') ? 'bold' : undefined,
          }}
          variant={c._type === 'drop-cap' ? 'drop-cap' : undefined}
        >
          {c.text}
        </Text>
      ))}
    </El>
  );
};

export default BlockText;
