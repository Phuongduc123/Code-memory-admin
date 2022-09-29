import {
  OPTION_FILTER_STATUS_EXPERIENCE,
  OPTION_FILTER_STATUS_PROJECT,
  OPTION_FILTER_TYPE_EXPERIENCE,
} from './ExperienceModel';
import { OPTION_FILTER_STATUS_SKILL } from './SkillModel';
import { TagStatus } from './TagModel';

export interface OptionSelect {
  label: string;
  value: string;
  urlIcon?: any;
  disabled?: boolean;
}
export interface IField {
  name: string;
  label?: string;
  placeholder?: string;
  passwordMode?: boolean;
  options?: OptionSelect[];
}

export interface FieldLogin {
  credential: IField;
  password: IField;
}

export const fieldLogin: FieldLogin = {
  credential: {
    name: 'credential',
    label: 'login.credential',
    placeholder: 'login.place_credential',
  },
  password: {
    name: 'password',
    label: 'login.password',
    placeholder: 'login.place_password',
    passwordMode: true,
  },
};

export const OPTION_FILTER_STATUS_TAG: OptionSelect[] = [
  {
    label: 'tag.active',
    value: TagStatus.ACTIVE,
  },
  {
    label: 'tag.hide',
    value: TagStatus.HIDE,
  },
];

export interface FieldSearchTag {
  key: IField;
  status: IField;
}

export interface FieldSearchExperience {
  key: IField;
  status: IField;
  type: IField;
}

export const fieldSearchTag: FieldSearchTag = {
  key: {
    name: 'key',
    label: 'tag.label_search_key',
    placeholder: 'tag.place_search_key',
  },
  status: {
    name: 'status',
    label: 'tag.label_search_status',
    options: OPTION_FILTER_STATUS_TAG,
  },
};

export const fieldSearchExperience: FieldSearchExperience = {
  key: {
    name: 'key',
    label: 'profile.experience',
    placeholder: 'profile.experience',
  },
  status: {
    name: 'status',
    label: 'profile.status',
    options: OPTION_FILTER_STATUS_EXPERIENCE,
  },
  type: {
    name: 'type',
    label: 'profile.type',
    options: OPTION_FILTER_TYPE_EXPERIENCE,
  },
};

export interface FieldCreateTag {
  description: IField;
  status: IField;
  title: IField;
  thumbnail?: IField;
}

export const fieldCreateTag: FieldCreateTag = {
  title: {
    name: 'title',
    label: 'tag.tag_name',
    placeholder: 'tag.place_input_tag',
  },
  description: {
    name: 'description',
    label: 'tag.place_input_tag_dec',
  },
  status: {
    name: 'status',
    label: 'tag.label_search_status',
    options: OPTION_FILTER_STATUS_TAG,
  },
  thumbnail: {
    name: 'thumbnail',
  },
};

export interface FieldCreateExperience {
  nameVN: IField;
  nameEN: IField;
  workType: IField;
  position: IField;
  descriptionVN: IField;
  descriptionEN: IField;
  startTime: IField;
  endTime: IField;
  status: IField;
  thumbnail?: IField;
}

export const fieldCreateExperience: FieldCreateExperience = {
  nameVN: {
    name: 'nameVN',
    label: 'profile.work_place_name_vn',
    placeholder: 'profile.work_place_name_vn',
  },
  nameEN: {
    name: 'nameEN',
    label: 'profile.work_place_name_en',
    placeholder: 'profile.work_place_name_en',
  },
  workType: {
    name: 'workType',
    label: 'profile.type',
    options: OPTION_FILTER_TYPE_EXPERIENCE,
  },
  position: {
    name: 'position',
    label: 'profile.position',
    placeholder: 'profile.position',
  },
  descriptionVN: {
    name: 'descriptionVN',
    label: 'profile.description_vn',
    placeholder: 'profile.description_vn',
  },
  descriptionEN: {
    name: 'descriptionEN',
    label: 'profile.description_en',
    placeholder: 'profile.description_en',
  },
  startTime: {
    name: 'startTime',
    label: 'profile.start',
    placeholder: 'profile.start',
  },
  endTime: {
    name: 'endTime',
    label: 'profile.end',
    placeholder: 'profile.end',
  },
  status: {
    name: 'status',
    label: 'profile.status',
    options: OPTION_FILTER_STATUS_EXPERIENCE,
  },
  thumbnail: {
    name: 'thumbnail',
  },
};

export interface FieldCreateProject {
  name: IField;
  nameEN: IField;
  size: IField;
  techs: IField;
  description: IField;
  descriptionEN: IField;
  startTime: IField;
  endTime: IField;
  status: IField;
}

export const fieldCreateProject: FieldCreateProject = {
  name: {
    name: 'name',
    label: 'profile.project_name_vn',
    placeholder: 'profile.project_name_vn',
  },
  nameEN: {
    name: 'nameEN',
    label: 'profile.project_name_en',
    placeholder: 'profile.project_name_en',
  },
  size: {
    name: 'size',
    label: 'profile.user_size',
    placeholder: 'profile.user_size',
  },
  techs: {
    name: 'techs',
    label: 'profile.technology',
    placeholder: 'profile.technology',
  },
  description: {
    name: 'description',
    label: 'profile.description_vn',
    placeholder: 'profile.description_vn',
  },
  descriptionEN: {
    name: 'descriptionEN',
    label: 'profile.description_en',
    placeholder: 'profile.description_en',
  },
  startTime: {
    name: 'startTime',
    label: 'profile.start',
    placeholder: 'profile.start',
  },
  endTime: {
    name: 'endTime',
    label: 'profile.end',
    placeholder: 'profile.end',
  },
  status: {
    name: 'status',
    label: 'profile.status',
    options: OPTION_FILTER_STATUS_PROJECT,
  },
};

export interface FieldCreateSkill {
  percent: IField;
  status: IField;
  tagId: IField;
}

export const FieldCreateSkill: FieldCreateSkill = {
  percent: {
    name: 'percent',
    label: 'profile.skill_proficiency',
    placeholder: '%',
  },
  status: {
    name: 'status',
    label: 'profile.status',
    options: OPTION_FILTER_STATUS_SKILL,
  },
  tagId: {
    name: 'tagId',
    label: 'profile.skill',
    placeholder: 'profile.skill',
  },
};
