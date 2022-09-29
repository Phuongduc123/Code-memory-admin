import { createSlice } from '@reduxjs/toolkit';
import { LayoutSlice } from '../../models/LayoutModel';
import { SetNotifyAction, setUploadSliceAction } from '../actionTypes/layoutActionTypes';
import { IRootState } from '../rootReducer';

const initialState: LayoutSlice = {
  processUpload: {
    loadingUpload: false,
    visibleProcessModal: false,
    msgErrUpload: '',
    count: 0,
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setNotifySlice: (state: LayoutSlice, action: SetNotifyAction) => {
      state.notify = action.payload;
    },
    setUploadSliceStart: (state: LayoutSlice, { payload }: setUploadSliceAction) => {
      state.processUpload.count = payload.count || state.processUpload.count;
      state.processUpload.loadingUpload = true;
      state.processUpload.visibleProcessModal = payload.visibleProcessModal;
    },
    setUploadSliceDone: (state: LayoutSlice, { payload }: setUploadSliceAction) => {
      state.processUpload.count--;
      state.processUpload.msgErrUpload = payload.msgErrUpload;
    },
    setUploadSliceClose: (state: LayoutSlice, action: any) => {
      state.processUpload.visibleProcessModal = false;
      state.processUpload.loadingUpload = false;
    }
  },
});

export const getLayoutSlice = (state: IRootState) => state.layoutSlice as LayoutSlice;

export const { setNotifySlice, setUploadSliceStart, setUploadSliceDone, setUploadSliceClose } = layoutSlice.actions;

export default layoutSlice.reducer;
