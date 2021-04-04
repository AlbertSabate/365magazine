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
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export type Mark = (
  | 'strong'
  | 'em'
);

export interface BlockTextContent {
  _type: 'block';
  _key: string;
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

export interface BlockRecipeStepContent {
  _type: 'recipeStep',
  _key: string;
  content: Array<BlockTextContent>;
  step: number;
}

export type BlockContent = BlockImageContent | BlockTextContent | BlockRecipeStepContent;

export const isBlockImage = (block?: BlockContent): block is BlockImageContent => block
  && (block as BlockImageContent)._type === 'image';
export const isBlockText = (block?: BlockContent): block is BlockTextContent => block
  && (block as BlockTextContent)._type === 'block';
export const isBlockRecipeStep = (block?: BlockContent): block is BlockRecipeStepContent => block
  && (block as BlockRecipeStepContent)._type === 'recipeStep';
