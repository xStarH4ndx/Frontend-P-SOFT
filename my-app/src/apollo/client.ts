import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'postgresql://localhost:5432/ejemplo', // URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
