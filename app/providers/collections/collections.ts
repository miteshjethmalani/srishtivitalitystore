import gql from 'graphql-tag';
import { sdk } from '../../graphqlWrapper';
import { listedProductFragment } from '../products/products';

export function getCollections(request: Request) {
  return sdk
    .collections(undefined, { request })
    .then((result) => result.collections?.items);
}

gql`
  query collections {
    collections {
      items {
        id
        name
        slug
        description
        parent {
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

gql`
  query collection($slug: String, $id: ID) {
    collection(slug: $slug, id: $id) {
      id
      name
      slug
      description
      customFields {
        metaTitle
        metaDescription
        metaKeywords
      }
      breadcrumbs {
        id
        name
        slug
      }
      children {
        id
        name
        slug
        description
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;
