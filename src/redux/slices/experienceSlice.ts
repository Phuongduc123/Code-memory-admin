import { createSlice } from '@reduxjs/toolkit';
import { ExpSlice } from '../../models/ExperienceModel';
import { TagSlice } from '../../models/TagModel';
import { getListExpAction, GetListExpSuccessAction, setVisibleExpFormAction, SubmitExpAction, SubmitExpActionSuccess } from '../actionTypes/experienceActionTypes';
import { IRootState } from '../rootReducer';

const initialState: ExpSlice = {
  dataExps: [],
  total: 0,
  isLoadingList: false,
  isLoadingForm: false,
  visibleFormExp: false,
  expDetail: {},
};

export const expSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    submitExpSliceStart: (state: ExpSlice, action: SubmitExpAction) => {
      state.isLoadingForm = true;
    },
    submitExpSliceSuccess: (state: ExpSlice, action: SubmitExpActionSuccess) => {
      state.isLoadingForm = false;
      state.visibleFormExp = false;
    },
    submitExpSliceError: (state: ExpSlice, action: any) => {
      state.isLoadingForm = false;
    },
    setVisibleFormExp: (state: ExpSlice, { payload }: setVisibleExpFormAction) => ({
        ...state,
        ...payload,
      }),
    getListExpStart: (state: ExpSlice, action: getListExpAction) => {
      state.isLoadingList = true;
    },
    getListExpSuccess: (state: ExpSlice, action: GetListExpSuccessAction) => {
      return {
        ...state,
        dataExps: action.payload.dataExps,
        total: action.payload.total,
        isLoadingList: false,
      };
    },
    getListExpError: (state: ExpSlice, action: any) => {
      state.isLoadingList = false;
    },

    
  },
});

export const getExpSlice = (state: IRootState) => state.expSlice as ExpSlice;

export const {
    submitExpSliceStart,
    submitExpSliceSuccess,
    submitExpSliceError,
    setVisibleFormExp,
    getListExpStart,
    getListExpSuccess,
    getListExpError
} = expSlice.actions;

export default expSlice.reducer;
