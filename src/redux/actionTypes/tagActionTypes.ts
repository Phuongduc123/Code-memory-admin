import { CreateTagInput, SearchTagInput, SearchTagOutput, Tag } from '../../models/TagModel';
import { PayloadName } from './loginActionTypes';

export type GetListTagAction = Record<
  PayloadName,
  {
    input: SearchTagInput;
  }
>;

export type SubmitTagAction = Record<
  PayloadName,
  {
    input: CreateTagInput;
    callback?: any;
  }
>;

export type setVisibleTagFormAction = Record<
  PayloadName,
  {
    visibleFormTag: boolean;
    tagDetail?: Tag;
  }
>;

export type SubmitTagActionSuccess = Record<PayloadName, Tag>;

export type GetListTagSuccessAction = Record<PayloadName, SearchTagOutput>;
