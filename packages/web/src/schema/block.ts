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

export interface BlockImageContent {
  _type: 'imageSimple';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  caption?: Array<BlockTextContent>;
}

export type Mark = (
  | 'strong'
  | 'em'
);

export interface MarkDefLink {
  _key: string;
  _type: 'link';
  href: string;
}

export interface BlockTextContentChildren {
  _key: string;
  _type: string;
  marks: Mark[];
  text: string;
}

export interface BlockTextContent {
  _type: 'block';
  _key: string;
  style?: BlockStyle;
  level?: number;
  listItem?: 'bullet';
  markDefs: Array<(
    | MarkDefLink
  )>;
  children: Array<BlockTextContentChildren>;
}

export interface BlockRecipeStepContent {
  _type: 'recipeStep',
  _key: string;
  content: Array<BlockTextContent>;
  step: number;
}

export interface BlockEmbedInstagram {
  _type: 'embedInstagram',
  _key: string;
  code: string;
}

export type BlockContent = (
  | BlockImageContent
  | BlockTextContent
  | BlockRecipeStepContent
  | BlockEmbedInstagram
);

export const isBlockImage = (block?: BlockContent): block is BlockImageContent => block
  && (block as BlockImageContent)._type === 'imageSimple';
export const isBlockText = (block?: BlockContent): block is BlockTextContent => block
  && (block as BlockTextContent)._type === 'block';
export const isBlockRecipeStep = (block?: BlockContent): block is BlockRecipeStepContent => block
  && (block as BlockRecipeStepContent)._type === 'recipeStep';
export const isBlockEmbedInstagram = (block?: BlockContent): block is BlockEmbedInstagram => block
  && (block as BlockEmbedInstagram)._type === 'embedInstagram';
