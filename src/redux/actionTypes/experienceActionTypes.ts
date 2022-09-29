import { CreateExpInput, Experience, SearchExpInput, SearchExpOutput } from "../../models/ExperienceModel";
import { PayloadName } from "./loginActionTypes";

export type SubmitExpAction = Record<
  PayloadName,
  {
    input: CreateExpInput;
    callback?: any;
  }
>;

export type SubmitExpActionSuccess = Record<PayloadName, Experience>;
export type setVisibleExpFormAction = Record<
  PayloadName,
  {
    visibleFormExp: boolean;
    expDetail?: Experience;
  }
>;

export type getListExpAction = Record<PayloadName, {
  input: SearchExpInput;
}>

export type GetListExpSuccessAction = Record<PayloadName, SearchExpOutput>;
