import { RESPONSE_USER, UserResolver } from './resolver/userResolver';
import { gql } from '@apollo/client';
import { LoginInput } from '../models/LoginModel';
import RequestService from '../services/requestService';

const requestService = new RequestService();

const postLoginQuery = gql`
  mutation LoginMutation($input: LoginInput!) {
    ${RESPONSE_USER.userLogin}(input: $input) {
      token
      user {
        ${UserResolver}
      }
    }
  }
`;

export const postLoginRequest = (input: LoginInput): any => {
  return requestService.mutation(postLoginQuery, { input }, RESPONSE_USER.userLogin);
};
