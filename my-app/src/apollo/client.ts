import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Configura el enlace HTTP para comunicarse con el servidor GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:8090/graphql', // URL de tu servidor GraphQL
});

// Configura el enlace de autenticación si es necesario
const authLink = setContext((_, { headers }) => {
  // Aquí puedes agregar encabezados de autenticación si es necesario
  // Por ejemplo, si tienes un token de autenticación almacenado en localStorage:
  // const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Maneja los errores de la red y del servidor GraphQL
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Combina todos los enlaces en una cadena
const link = errorLink.concat(authLink).concat(httpLink);

// Crea una instancia del cliente Apollo
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
