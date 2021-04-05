import { Post, Recipe } from './root';

export type Article = (
  | Post
  | Recipe
);

export const isPostArticle = (a: Article): a is Post => a._type === 'post';
export const isRecipeArticle = (a: Article): a is Recipe => a._type === 'recipe';
