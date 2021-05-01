import { gql } from '@apollo/client';
import Fragments from './fragments';

const Queries = {
  listPosts: gql`
    ${Fragments.ImageBasic}
    ${Fragments.ListDocument}
    ${Fragments.ListPost}
    
    query ListPosts {
      allPost {
        ...PostListing
      }
    }
  `,

  listRecipes: gql`
    ${Fragments.ImageBasic}
    ${Fragments.ListDocument}
    ${Fragments.ListRecipe}
    
    query ListRecipes {
      allRecipe {
        ...RecipeListing
      }
    }
  `,

  listCategories: gql`
    ${Fragments.ListCategory}
    
    query ListCategories {
      allCategory {
        ...CategoryListing
      }
    }
  `,

  listAuthors: gql`
    ${Fragments.ListAuthor}
    
    query ListAuthors {
      allAuthor {
        ...AuthorListing
      }
    }
  `,

  listPostSlugs: gql`
    query Posts {
      allPost {
        _id
        slug {
          current
        }
      }
    }
  `,

  listRecipeSlugs: gql`
    query Recipes {
      allRecipe {
        _id
        slug {
          current
        }
      }
    }
  `,

  getPostBySlug: gql`
    ${Fragments.ListPost}
    ${Fragments.ListDocument}
    ${Fragments.ImageBasic}

    query GetPostBySlug($slug: String) {
      allPost(
        where: {
          slug: {
            current: {
              eq: $slug
            }
          }
        }
      ) {
        ...PostListing
        contentRaw
      }
    }
  `,

  getRecipeBySlug: gql`
    ${Fragments.ListRecipe}
    ${Fragments.ListDocument}
    ${Fragments.ImageBasic}

    query GetRecipeBySlug($slug: String) {
      allRecipe(
        where: {
          slug: {
            current: {
              eq: $slug
            }
          }
        }
      ) {
        ...RecipeListing
        contentRaw
        recipeInfo {
          cookingTime
          ingredients {
            _key
            amount
            ingredient
            note
          }
          makes
          serves
        }
      }
    }
  `,
};

export default Queries;
