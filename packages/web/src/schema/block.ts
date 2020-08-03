export type HeadingTag = (
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
);

export type BlockStyle = HeadingTag | (
  | 'normal'
  | 'quote'
);

export interface BlockImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  _key: string;
  _type: 'image';
}

export type Mark = (
  | 'strong'
);

export interface BlockText {
  _key: string;
  type: 'block';
  style?: BlockStyle;
  level?: number;
  listItem?: 'bullet';
  markDefs: Array<string>;
  children: Array<{
    _key: string;
    _type: string;
    marks: Mark[];
    text: string;
  }>;
}

export type BlockContent = BlockImage | BlockText;

export const isBlockImage = (block: BlockContent): block is BlockImage => !!(block as BlockImage).asset;
