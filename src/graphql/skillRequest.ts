import { gql } from '@apollo/client';
import { CreateExpInput, SearchExpInput, UpdateExpInput } from '../models/ExperienceModel';
import { CreatePJInput, SearchProjectInput, UpdateProjectInput } from '../models/ProjectModel';
import { CreateSkillInput, SearchSkillInput, UpdateSkillInput } from '../models/SkillModel';
import { UpdateTagInput } from '../models/TagModel';
import RequestService from '../services/requestService';
import { ExpResolver, RESPONSE_EXP } from './resolver/expResolver';
import { PJResolver, RESPONSE_PJ } from './resolver/ProjectResolver';
import { RESPONSE_SKILL, SkillResolver } from './resolver/skillResolver';
import { TagResolver, RESPONSE_TAG } from './resolver/tagResolver';
import { UserResolver } from './resolver/userResolver';

const requestService = new RequestService();

const addSkillQuery = gql`
  mutation createSkillMutation($input: AddUserSkillInput!) {
    ${RESPONSE_SKILL.userAddSkill}(input: $input) 
  }
`;

const getListSkillQuery = gql`
  query ListSkillQuery($input: FindUserInput!) {
    ${RESPONSE_SKILL.userSkills}(input: $input) {
      ${SkillResolver}
      tagData {
        ${TagResolver}
      }
    }
  }
`;

const updateSkillQuery = gql`
  mutation UpdateSkillMutation($input: UpdateUserSkill!) {
    ${RESPONSE_SKILL.userUpdateSkill}(input: $input)
  }
`;

export const getListSkillRequest = (input: SearchSkillInput): any => {
  return requestService.query(getListSkillQuery, { input }, RESPONSE_SKILL.userSkills);
};

export const submitSkillRequest = (input: CreateSkillInput): any => {
  return requestService.mutation(addSkillQuery, { input }, RESPONSE_SKILL.userAddSkill);
};

export const updateUserSkillRequest = (input: UpdateSkillInput): any => {
  return requestService.mutation(updateSkillQuery, { input }, RESPONSE_SKILL.userUpdateSkill)
}
