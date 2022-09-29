import { User } from './UserModel';

export enum TagStatus {
  HIDE = 'HIDE',
  ACTIVE = 'ACTIVE',
}

export enum TagType {
  SYSTEM = 'SYSTEM',
  ADDITION = 'ADDITION',
}

export interface SearchTagInput {
  key: string;
  status: TagStatus[];
  limit: number;
  offset: number;
  sortBy?: number | string;
  orderBy?: string;
}

export interface Tag {
  description?: string;
  id?: string;
  slug?: string;
  status?: TagStatus;
  tagType?: TagType;
  thumbnail?: string;
  title?: string;
  createBy?: string;
  createdAt?: string;
  updatedAt?: string;
  userCreate?: User;
}

export type TagSlice = {
  dataTags: Tag[];
  total: number;
  isLoadingList: boolean;
  isLoadingForm: boolean;
  tagDetail?: Tag;
  visibleFormTag: boolean;
};

export interface SearchTagOutput {
  dataTags: Tag[];
  total: number;
}

export interface CreateTagInput {
  description: string;
  status: TagStatus;
  thumbnail: any;
  title: string;
  id: string;
}

export interface UpdateTagInput {
  data: CreateTagInput;
  tagId: string;
}

