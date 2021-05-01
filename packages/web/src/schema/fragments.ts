import { gql } from '@apollo/client';

const Fragments = {
  ListDocument: gql`
    fragment DocumentListing on Document {
      _id
      _type
      _createdAt
      _updatedAt
      _rev
    } 
  `,
  ListPost: gql`
    fragment PostListing on Post {
      ...DocumentListing
      _key
      author {
        who {
          _id
        }
      }
      categories {
        _id
      }
      mainImage {
        ...ImageBasic
      }
      publishedAt
      slug {
        current
      }
      tagline
      tags {
        _id
      }
      title
    }
  `,
  ListRecipe: gql`
    fragment RecipeListing on Recipe {
      ...DocumentListing
      _key
      author {
        who {
          _id
        }
      }
      categories {
        _id
      }
      mainImage {
        ...ImageBasic
      }
      publishedAt
      slug {
        current
      }
      tagline
      tags {
        _id
      }
      title
    }
  `,
  ListCategory: gql`
    fragment CategoryListing on Category {
      ...DocumentListing
      _key
      description
      title
    }
  `,
  ListAuthor: gql`
    fragment AuthorListing on Author {
      _id
      bioRaw
      image {
        ...ImageBasic
      }
      instagram
      name
      slug {
        current
      }
      title
      website
    },
  `,
  ImageBasic: gql`
    fragment ImageBasic on Image {
      _key
      asset {
        _id
        label
        title
        description
        size
        path
        url
        metadata {
          dimensions {
            height
            width
            aspectRatio
          }
        }
      }
    } 
  `,
};

export default Fragments;
