import { Tag } from './TagModel';
import { User } from './UserModel';

export enum ProjectStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export interface Project {
  createBy?: string;
  createAt?: string;
  id?: string;
  name?: string;
  nameEN?: string;
  description?: string;
  descriptionEN?: string;
  endTime?: string;
  size?: number;
  startTime?: string;
  status?: string;
  techs?: string[];
  techsData?: Tag[];
  updatedAt?: string;
  userCreate?: User;
}

export interface CreatePJInput {
  id: string;
  name: string;
  nameEN: string;
  size: number;
  techs: string[];
  description: string;
  descriptionEN: string;
  startTime: any;
  endTime: any;
  status: string;
}

export type PJSlice = {
  dataPJs: Project[];
  total: number;
  isLoadingList: boolean;
  isLoadingForm: boolean;
  pjDetail?: Project;
  visibleFormPJ: boolean;
};

export interface SearchProjectInput {
  key: string;
  status: ProjectStatus[];
  limit: number;
  offset: number;
  sortBy?: number | string;
  orderBy?: string;
}

export interface SearchProjectOutput {
  dataProjects: Project[];
  total: number;
}

export interface UpdateProjectInput {
  data: CreatePJInput;
  projectId: string;
}
