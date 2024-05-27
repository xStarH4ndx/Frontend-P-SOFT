import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8090/graphiql?path=/graphql', // URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
