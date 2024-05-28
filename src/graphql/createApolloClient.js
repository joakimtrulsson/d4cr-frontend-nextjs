import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/graphql`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
