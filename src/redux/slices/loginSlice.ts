import { IRootState } from './../rootReducer';
import { createSlice } from '@reduxjs/toolkit';
import { LoginSlice } from '../../models/LoginModel';
import { LoginActionInput, LoginActionOutput } from '../actionTypes/loginActionTypes';

const initialState: LoginSlice = {
  messageError: '',
  token: '',
  user: {},
  loadingLogin: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSliceStart: (state: LoginSlice, action: LoginActionInput) => {
      state.loadingLogin = true;
    },
    loginSliceSuccess: (state: LoginSlice, action: LoginActionOutput) => {
      state.loadingLogin = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginSliceError: (state: LoginSlice, action: any) => {
      state.loadingLogin = false;
    },
    logoutSliceStart: (state: LoginSlice) => {
      state.user = {};
      state.token = "";
    }
  },
});

export const getloginSlice = (state: IRootState) => state.loginSlice;

export const { loginSliceStart, loginSliceSuccess, loginSliceError, logoutSliceStart } = loginSlice.actions;

export default loginSlice.reducer;
