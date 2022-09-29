import { HistoryField } from './CommonModel';
import { User } from './UserModel';
import { IField } from "./FieldModel";


export type SeoHomeImage = {
  faviconUrlICO: String,
  faviconUrlJPG: String,
  logo400x400: String,
  logo800x600: String,
  logo1280x720: String,
  logoAlt: String,
  logoAltEN: String,
}

export type SeoHomeSocial = {
  facebookAppId: String,
  facebookPageUrl: String,
  twitterUrl: String,
  youtubeUrl: String,
}

export interface SeoHome {
  id?: string,
  title?: string,
  titleEN?: string,
  description?: string,
  descriptionEN?: String
  domain?: string,
  facebookChatPlugin?: string,
  image?: SeoHomeImage,
  searchBoxUrl?: string,
  siteName?: string,
  social?: SeoHomeSocial,
  history?: HistoryField[],
  createBy?: string;
  createdAt?: string;
  reason?: string;
  userCreate?: User;
}

export interface FieldSocialSeoHome {
  facebookAppId: IField,
  facebookPageUrl: IField,
  twitterUrl: IField,
  youtubeUrl: IField,
}

export interface FieldImageSeoHome {
  faviconUrlICO: IField,
  faviconUrlJPG: IField,
  logo1280x720: IField,
  logo400x400: IField,
  logo800x600: IField,
  logoAlt: IField,
  logoAltEN: IField,
}

export interface FieldSeoHome {
  title: IField;
  description: IField;
  titleEN: IField;
  descriptionEN: IField;
  domain: IField;
  facebookChatPlugin: IField;
  searchBoxUrl: IField;
  siteName: IField;
  reason: IField;
  image: FieldImageSeoHome,
  social: FieldSocialSeoHome,
}



export const fieldSeoHome: FieldSeoHome = {
  siteName: {
    name: "siteName",
    label: "seo.siteName",
    placeholder: "seo.placeholder_siteName"
  },
  title: {
    name: "title",
    label: "seo.title",
    placeholder: "seo.placeholder_title"
  },
  titleEN: {
    name: "titleEN",
    label: "seo.titleEN",
    placeholder: "seo.placeholder_title"
  },
  description: {
    name: "description",
    label: "seo.description",
    placeholder: "seo.placeholder_description",
  },
  descriptionEN: {
    name: "descriptionEN",
    label: "seo.descriptionEN",
    placeholder: "seo.placeholder_description",
  },
  domain: {
    name: "domain",
    label: "seo.domain",
    placeholder: "seo.placeholder_domain",
  },
  searchBoxUrl: {
    name: "searchBoxUrl",
    label: "seo.searchBoxUrl",
    placeholder: "seo.placeholder_searchBoxUrl",
  },
  facebookChatPlugin: {
    name: "facebookChatPlugin",
    label: "seo.facebookChatPlugin",
    placeholder: "seo.placeholder_facebookChatPlugin"
  },
  reason: {
    name: "reason",
    label: "seo.reason",
  },
  image: {
    faviconUrlICO: {
      name: "image.faviconUrlICO",
      label: "seo.faviconUrlICO",
    },
    faviconUrlJPG: {
      name: "image.faviconUrlJPG",
      label: "seo.faviconUrlJPG",
    },
    logo1280x720: {
      name: "image.logo1280x720",
      label: "seo.logo1280x720",
    },
    logo400x400: {
      name: "image.logo400x400",
      label: "seo.logo400x400",
    },
    logo800x600: {
      name: "image.logo800x600",
      label: "seo.logo800x600"
    },
    logoAlt: {
      name: "image.logoAlt",
      label: "seo.logoAlt",
    },
    logoAltEN: {
      name: "image.logoAltEN",
      label: "seo.logoAltEN",
    },

  },
  social: {
    facebookAppId: {
      name: "social.facebookAppId",
      label: "seo.facebookAppId",
    },
    facebookPageUrl: {
      name: "social.facebookPageUrl",
      label: "seo.facebookPageUrl"
    },
    twitterUrl: {
      name: "social.twitterUrl",
      label: "seo.twitterUrl"
    },
    youtubeUrl: {
      name: "social.youtubeUrl",
      label: "seo.youtubeUrl"
    },
  },
};