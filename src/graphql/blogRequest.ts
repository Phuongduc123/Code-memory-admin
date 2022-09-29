import { gql } from '@apollo/client';
import { BlogInput } from '../models/BlogModel';
import { LoginInput } from '../models/LoginModel';
import RequestService from '../services/requestService';

const requestService = new RequestService();

const addBlogQuery = gql`
  mutation BlogMutation($title: String!, $createBy: String!, $description: String!, $content: [BlogContentInput!]!) {
    blogCreate(input: { title: $title, createBy: $createBy, description: $description, content: $content }) {
      id
    }
  }
`;

export const addBlogRequest = (variables: BlogInput): any => {
  return requestService.mutation(addBlogQuery, variables, 'blogCreate');
};
