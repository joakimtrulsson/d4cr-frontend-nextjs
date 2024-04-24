import { ApolloClient, InMemoryCache } from '@apollo/client';

let apolloClient;

function initializeApollo() {
  if (apolloClient) return apolloClient;

  apolloClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return apolloClient;
}

export default initializeApollo;
