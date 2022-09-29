import seoHomeSlice from './slices/seoHomeSlice';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import layoutSlice from './slices/layoutSlice';
import loginSlice from './slices/loginSlice';
import tagSlice from './slices/tagSlice';
import expSlice from './slices/experienceSlice';
import pjSlice from './slices/projectSlice';
import skillSlice from './slices/skillSlice';

export const getPersistConfig = (key = '', nested = {}) => {
  return {
    key,
    storage: storage,
    ...nested,
  };
};

export const whitelist = [];

const persistLoginSlice = persistReducer(getPersistConfig('loginSlice', { whitelist: ['token', 'user'] }), loginSlice);

const rootReducer = combineReducers({
  loginSlice: persistLoginSlice,
  layoutSlice,
  tagSlice,
  seoHomeSlice,
  expSlice,
  pjSlice,
  skillSlice,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
