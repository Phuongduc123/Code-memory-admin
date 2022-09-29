import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from './../rootReducer';
import { SeoHome } from './../../models/SeoHomeModel';
import { SubmitSeoHome, SubmitSeoHomeSuccess, GetEntireSeoHomeSuccess } from './../actionTypes/seoHomeActionTypes';
export interface SeoHomeSlice {
  seoHome: SeoHome,
  seoHomeEntire: SeoHome[],
  isLoadingSubmit: boolean;
  isLoadingSeoHome: boolean;
  isLoadingList: boolean;
}

const initialState: SeoHomeSlice = {
  seoHome: {
    description: "",
    descriptionEN: "",
    domain: "",
    facebookChatPlugin: "",
    image: {
      faviconUrlICO: "",
      faviconUrlJPG: "",
      logo1280x720: "",
      logo400x400: "",
      logo800x600: "",
      logoAlt: "",
      logoAltEN: "",
    },
    siteName: "",
    social: {
      facebookAppId: "",
      facebookPageUrl: "",
      twitterUrl: "",
      youtubeUrl: "",
    },
    searchBoxUrl: "",
    title: "",
    titleEN: "",
    id: "",
  },
  isLoadingSubmit: false,
  isLoadingSeoHome: true,
  isLoadingList: true,
  seoHomeEntire: [],
};


export const seoHomeSlice = createSlice({
  name: 'seoHome',
  initialState,
  reducers: {
    getSeoHomeStart: (state: SeoHomeSlice) => {
      state.isLoadingSeoHome = true;
    },
    getSeoHomeSuccess: (state: SeoHomeSlice, action: any) => {
      state.seoHome = action.payload;
      state.isLoadingSeoHome = false;
    },
    getSeoHomeError: (state: SeoHomeSlice, action: any) => {
      state.isLoadingSeoHome = false;
    },
    getSeoHomeEntireStart: (state: SeoHomeSlice) => {
      state.isLoadingList = true;
    },
    getSeoHomeEntireSuccess: (state: SeoHomeSlice, { payload }: GetEntireSeoHomeSuccess) => {
      state.isLoadingList = false;
      state.seoHomeEntire = payload.seoHomeEntire;
    },
    getSeoHomeEntireError: (state: SeoHomeSlice, action: any) => {
      state.isLoadingList = false;
    },
    submitSeoHomeStart: (state: SeoHomeSlice, action: SubmitSeoHome) => {
      state.isLoadingSubmit = true;
    },
    submitSeoHomeSuccess: (state: SeoHomeSlice, { payload }: SubmitSeoHomeSuccess) => {
      state.isLoadingSubmit = false;
      state.seoHome = payload.seoHome;
    },
    submitSeoHomeError: (state: SeoHomeSlice, action: any) => {
      state.isLoadingSubmit = false;
    },
  },

});

export const getSeoHomeSlice = (state: IRootState): SeoHomeSlice => state.seoHomeSlice;

export const { getSeoHomeEntireStart, getSeoHomeEntireSuccess, getSeoHomeEntireError, getSeoHomeStart, getSeoHomeSuccess, getSeoHomeError, submitSeoHomeSuccess, submitSeoHomeStart, submitSeoHomeError } = seoHomeSlice.actions;

export default seoHomeSlice.reducer;