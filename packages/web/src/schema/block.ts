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

export interface BlockContent {
  _key: string;
  type: 'block';
  style?: BlockStyle;
  level?: number;
  listItem?: 'bullet';
  children: Array<{
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }>;
}
