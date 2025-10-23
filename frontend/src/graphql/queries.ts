import { gql } from '@apollo/client';

export const PLACE_FRAGMENT = gql`
  fragment PlaceFields on Place {
    id
    name
    description
    category
    rating
    lat
    lng
    address
    city
    state
    country
    imageUrl
  }
`;

export const SEARCH_PLACES = gql`
  ${PLACE_FRAGMENT}
  query SearchPlaces(
    $first: Int
    $after: String
    $filter: SearchPlacesFilterInput
  ) {
    searchPlaces(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          ...PlaceFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
