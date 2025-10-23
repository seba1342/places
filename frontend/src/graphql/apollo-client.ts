import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchPlaces: {
            keyArgs: ['filter'],
            merge(existing, incoming) {
              if (!existing) return incoming;
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
