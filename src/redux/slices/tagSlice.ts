import { createSlice } from '@reduxjs/toolkit';
import { TagSlice } from '../../models/TagModel';
import {
  GetListTagAction,
  GetListTagSuccessAction,
  setVisibleTagFormAction,
  SubmitTagAction,
  SubmitTagActionSuccess,
} from '../actionTypes/tagActionTypes';
import { IRootState } from '../rootReducer';

const initialState: TagSlice = {
  dataTags: [],
  total: 0,
  isLoadingList: false,
  isLoadingForm: false,
  visibleFormTag: false,
  tagDetail: {},
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setVisibleFormTag: (state: TagSlice, { payload }: setVisibleTagFormAction) => ({
      ...state,
      ...payload,
    }),
    getTagListSliceStart: (state: TagSlice, action: GetListTagAction) => {
      state.isLoadingList = true;
    },
    getTagListSliceSuccess: (state: TagSlice, action: GetListTagSuccessAction) => {
      return {
        ...state,
        dataTags: action.payload.dataTags,
        total: action.payload.total,
        isLoadingList: false,
      };
    },
    getTagListSliceError: (state: TagSlice, action: any) => {
      state.isLoadingList = false;
    },
    submitTagSliceStart: (state: TagSlice, action: SubmitTagAction) => {
      state.isLoadingForm = true;
    },
    submitTagSliceSuccess: (state: TagSlice, action: SubmitTagActionSuccess) => {
      state.isLoadingForm = false;
      state.visibleFormTag = false;
    },
    submitTagSliceError: (state: TagSlice, action: any) => {
      state.isLoadingForm = false;
    },
  },
});

export const getTagSlice = (state: IRootState) => state.tagSlice as TagSlice;

export const {
  getTagListSliceStart,
  getTagListSliceSuccess,
  getTagListSliceError,
  submitTagSliceStart,
  submitTagSliceSuccess,
  submitTagSliceError,
  setVisibleFormTag,
} = tagSlice.actions;

export default tagSlice.reducer;
