import { DocumentNode } from 'graphql';
import { FETCH_POLICY } from '../constant';
import { apolloInstance, ApolloType } from '../graphql/apolloConnect';

export default class RequestService {
  client: ApolloType = null;
  constructor() {
    this.client = apolloInstance;
  }

  handleResponse =
    (callback = '') =>
      (res: any): any => {
        return callback ? res.data[callback] : res.data;
      };

  query = async (query: DocumentNode, variables: any = {}, callback = '', fetchPolicy: any = FETCH_POLICY.DEFAULT) => {
    return await this.client.query({ query, variables, fetchPolicy }).then(this.handleResponse(callback));
  };

  mutation = async (mutation: DocumentNode, variables: any = {}, callback = '') => {
    await this.client.resetStore();
    return this.client.mutate({ mutation, variables }).then(this.handleResponse(callback));
  };
}
