import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_API_TOKEN}`,
  },
  cache,
});

// https://retool.com/pricing/
