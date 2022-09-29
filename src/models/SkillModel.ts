import { OptionSelect } from './FieldModel';
import { Tag } from './TagModel';

export interface Skill {
  percent?: number;
  status?: string;
  tagId?: string;
  tagData?: Tag;
}

export enum SkillStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export const OPTION_FILTER_STATUS_SKILL: OptionSelect[] = [
  {
    label: 'profile.show_in_profile',
    value: SkillStatus.ACTIVE,
  },
  {
    label: 'profile.dont_show_in_profile',
    value: SkillStatus.INACTIVE,
  },
];

export interface CreateSkillInput {
  percent: number;
  tagId: string;
  status: string;
}


export interface UpdateSkillInput {
  data: CreateSkillInput[]
}

export type SkillSlice = {
  dataSkills: Skill[];
  total: number;
  isLoadingList: boolean;
  isLoadingForm: boolean;
  skillDetail?: Skill;
  visibleFormSkill: boolean;
  disableButton: boolean;
};


export interface SearchSkillInput {
  credential?:string
}