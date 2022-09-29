import { gql } from '@apollo/client';
import { CreateTagInput, SearchTagInput, UpdateTagInput } from '../models/TagModel';
import RequestService from '../services/requestService';
import { TagResolver, RESPONSE_TAG } from './resolver/tagResolver';
import { UserResolver } from './resolver/userResolver';

const requestService = new RequestService();

const getListTagQuery = gql`
  query ListTagQuery($input: SearchTagInput!) {
    ${RESPONSE_TAG.tagList}(input: $input) {
      dataTags {
        ${TagResolver}
        ${RESPONSE_TAG.userCreate} {
          ${UserResolver}
        }
      }
      total
    }
  }
`;

export const getListTagRequest = (input: SearchTagInput): any => {
  return requestService.query(getListTagQuery, { input }, RESPONSE_TAG.tagList);
};

const addTagQuery = gql`
  mutation createTagMutation($input: CreateTagInput!) {
    ${RESPONSE_TAG.tagCreate}(input: $input) {
      ${TagResolver}
      ${RESPONSE_TAG.userCreate} {
        ${UserResolver}
      }
    }
  }
`;

const updateTagQuery = gql`
  mutation UpdateTagMutation($input: UpdateTagInput!) {
    ${RESPONSE_TAG.tagUpdate}(input: $input) {
      ${TagResolver}
      ${RESPONSE_TAG.userCreate} {
        ${UserResolver}
      }
    }
  }
`;

export const submitTagRequest = (input: CreateTagInput): any => {
  const id = input.id;
  delete input.id;
  if (!!id) {
    const dataQueryUpdate: UpdateTagInput = { data: input, tagId: id };
    return requestService.mutation(updateTagQuery, { input: dataQueryUpdate }, RESPONSE_TAG.tagUpdate);
  } else {
    return requestService.mutation(addTagQuery, { input }, RESPONSE_TAG.tagCreate);
  }
};
