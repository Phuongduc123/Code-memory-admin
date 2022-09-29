import { Blog, BlogInput } from '../../models/BlogModel';
import { LoginInput } from '../../models/LoginModel';

export const BLOG_ACTION_TYPES = 'blogActionTypes';

export const ADD_BLOG_REQUESTING = `${BLOG_ACTION_TYPES}/ADD_BLOG_REQUESTING`;
export interface addBlogAction {
  type: typeof ADD_BLOG_REQUESTING;
  blogInput: BlogInput;
}
export const ADD_BLOG_SUCCESS = `${BLOG_ACTION_TYPES}/ADD_BLOG_SUCCESS`;
export interface addBlogActionSuccess {
  type: typeof ADD_BLOG_SUCCESS;
  blog: Blog;
}

export const ADD_BLOG_ERROR = `${BLOG_ACTION_TYPES}/ADD_BLOG_ERROR`;
export interface addBlogActionError {
  type: typeof ADD_BLOG_ERROR;
  messageError: string;
}

export type BlogAction = {
  type: string;
  BlogInput: LoginInput;
  blog: Blog;
  messageError: string;
};
