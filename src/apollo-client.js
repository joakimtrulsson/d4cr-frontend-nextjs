import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://d4cr-keystone-19d55dc6f889.herokuapp.com/api/graphql',
  cache: new InMemoryCache(),
});
//https://d4cr-keystone-19d55dc6f889.herokuapp.com/     http://localhost:3000/
export default client;