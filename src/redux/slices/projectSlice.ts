import { createSlice } from '@reduxjs/toolkit';
import { ExpSlice } from '../../models/ExperienceModel';
import { PJSlice } from '../../models/ProjectModel';
import { TagSlice } from '../../models/TagModel';
import {
  getListPJAction,
  GetListPJSuccessAction,
  setVisiblePJFormAction,
  SubmitPJAction,
  SubmitPJActionSuccess,
} from '../actionTypes/projectAction';

import { IRootState } from '../rootReducer';

const initialState: PJSlice = {
  dataPJs: [],
  total: 0,
  isLoadingList: false,
  isLoadingForm: false,
  visibleFormPJ: false,
  pjDetail: {},
};

export const pjSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    submitPJSliceStart: (state: PJSlice, action: SubmitPJAction) => {
      state.isLoadingForm = true;
    },
    submitPJSliceSuccess: (state: PJSlice, action: SubmitPJActionSuccess) => {
      state.isLoadingForm = false;
      state.visibleFormPJ = false;
    },
    submitPJSliceError: (state: PJSlice, action: any) => {
      state.isLoadingForm = false;
    },
    setVisibleFormProject: (state: PJSlice, { payload }: setVisiblePJFormAction) => ({
      ...state,
      ...payload,
    }),
    getListPJStart: (state: PJSlice, action: getListPJAction) => {
      state.isLoadingList = true;
    },
    getListPJSuccess: (state: PJSlice, action: GetListPJSuccessAction) => {
      return {
        ...state,
        dataPJs: action.payload.dataProjects,
        total: action.payload.total,
        isLoadingList: false,
      };
    },
    getListPJError: (state: PJSlice, action: any) => {
      state.isLoadingList = false;
    },
  },
});

export const getPJSlice = (state: IRootState) => state.pjSlice as PJSlice;

export const {
  submitPJSliceStart,
  submitPJSliceSuccess,
  submitPJSliceError,
  setVisibleFormProject,
  getListPJStart,
  getListPJSuccess,
  getListPJError,
} = pjSlice.actions;

export default pjSlice.reducer;
