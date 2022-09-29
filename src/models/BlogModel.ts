import { IField } from './FieldModel';
export const BLOG_FIELD_NAME = 'blog_content_field';

export enum BlogContentType {
  CODE,
  EDITOR,
  IMAGE,
  IFRAME,
}

export type ImageLanguage = {
  alt: string;
  width: string;
  height: string;
  autoWidth: boolean;
};

export interface BlogContent {
  type?: BlogContentType;

  data?: string;

  language?: string;
}

export type FieldBlogProps = {
  className?: string;
  fieldValue: BlogContent;
  callbackChange: any;
};

export interface Blog {
  id: string;

  title: string;

  slug: string;

  description: string;

  createBy: string;

  content: BlogContent[];

  createdAt?: string;

  updatedAt?: string;
}

export interface BlogInput {
  title: string;
  description: string;
  content: BlogContent[];
  tag?: Array<string>;
}

export interface FieldBlog {
  title: IField;
  description: IField;
  tag: IField;
  thumbnail: IField;
}

export const fieldBlog: FieldBlog = {
  title: {
    name: 'title',
    label: 'blog.label_title',
    placeholder: 'blog.place_title',
  },
  description: {
    name: 'description',
    label: 'blog.label_description',
    placeholder: 'blog.place_description',
  },
  tag: {
    name: 'tag',
    label: 'blog.label_tag',
  },
  thumbnail: {
    name: 'thumbnail',
    label: 'blog.label_thumbnail',
  },
};
