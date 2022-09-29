import { OptionSelect } from './FieldModel';
import { ProjectStatus } from './ProjectModel';
import { User } from './UserModel';

export enum ExperienceStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export enum ExperienceType {
  CERTIFICATE = 'CERTIFICATE',
  LEARN = 'LEARN',
  WORK = 'WORK',
}

export interface SearchExpInput {
  key: string;
  status: ExperienceStatus[];
  type: ExperienceType[];
  limit: number;
  offset: number;
  sortBy?: number | string;
  orderBy?: string;
}

export interface Experience {
  createBy?: string;
  createdAt?: string;
  id?: string;
  nameVN?: string;
  nameEN?: string;
  workType?: string;
  position?: string;
  descriptionVN?: string;
  descriptionEN?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  thumbnail?: any;
  updatedAt?: string;
  userCreate?: User;
}

export interface CreateExpInput {
  id: string;
  nameVN: string;
  nameEN: string;
  workType: string;
  position: string;
  descriptionVN: string;
  descriptionEN: string;
  startTime: any;
  endTime: any;
  status: string;
  thumbnail?: any;
}

export interface SearchExpOutput {
  dataExps: Experience[];
  total: number;
}

export const OPTION_FILTER_STATUS_EXPERIENCE: OptionSelect[] = [
  {
    label: 'profile.active',
    value: ExperienceStatus.ACTIVE,
  },
  {
    label: 'profile.inactive',
    value: ExperienceStatus.INACTIVE,
  },
];

export const OPTION_FILTER_STATUS_PROJECT: OptionSelect[] = [
  {
    label: 'profile.active',
    value: ProjectStatus.ACTIVE,
  },
  {
    label: 'profile.inactive',
    value: ProjectStatus.INACTIVE,
  },
];

export const OPTION_FILTER_TYPE_EXPERIENCE: OptionSelect[] = [
  {
    label: 'profile.certificate',
    value: ExperienceType.CERTIFICATE,
  },
  {
    label: 'profile.learn',
    value: ExperienceType.LEARN,
  },
  {
    label: 'profile.work',
    value: ExperienceType.WORK,
  },
];

export type ExpSlice = {
  dataExps: Experience[];
  total: number;
  isLoadingList: boolean;
  isLoadingForm: boolean;
  expDetail?: Experience;
  visibleFormExp: boolean;
};

export interface UpdateExpInput {
  data: CreateExpInput;
  workId: string;
}
