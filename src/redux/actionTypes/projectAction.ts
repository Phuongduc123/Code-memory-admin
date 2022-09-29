import { CreatePJInput, Project, SearchProjectInput, SearchProjectOutput } from '../../models/ProjectModel';
import { PayloadName } from './loginActionTypes';

export type SubmitPJAction = Record<
  PayloadName,
  {
    input: CreatePJInput;
    callback?: any;
  }
>;

export type SubmitPJActionSuccess = Record<PayloadName, Project>;

export type setVisiblePJFormAction = Record<
  PayloadName,
  {
    visibleFormPJ: boolean;
    pjDetail?: Project;
  }
>;

export type getListPJAction = Record<
  PayloadName,
  {
    input: SearchProjectInput;
  }
>;

export type GetListPJSuccessAction = Record<PayloadName, SearchProjectOutput>;
