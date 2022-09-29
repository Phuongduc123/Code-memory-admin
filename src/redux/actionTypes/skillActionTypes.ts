import { CreateSkillInput, Skill } from '../../models/SkillModel';

export type PayloadName = 'payload';

export type SubmitSkillAction = Record<
  PayloadName,
  {
    input: CreateSkillInput;
    callback?: any;
  }
>;

export type SubmitSkillActionSuccess = Record<PayloadName, Skill>;

export type setVisibleSkillFormAction = Record<
  PayloadName,
  {
    visibleFormSkill: boolean;
    skillDetail?: Skill;
  }
>;

export type getListSkillAction = Record<PayloadName, {
  credential: string;
}>

export type getListSkillSuccessAction = Record<PayloadName, Skill[]>
export type setCheckedSkillAction = Record<PayloadName,{status: string, index:number}>
export type updateSkillAction = Record<PayloadName, {callback: any}>
export type udpateSkillListAction = Record<PayloadName, {dataSkills: Skill[]}>
export type setProficiencyAction = Record<PayloadName, {percent: number, index: number}>