import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import store from '../redux/rootStore';
import { setContext } from '@apollo/client/link/context';
export const APOLLO_SERVER_URL = process.env.REACT_APP_GRAPH_URI;

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${APOLLO_SERVER_URL}/graphql`,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = store.getState().loginSlice.token || '';
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });
  return {
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  };
};

export const apolloInstance = new ApolloClient(createApolloClient());

export type ApolloType = typeof apolloInstance;
