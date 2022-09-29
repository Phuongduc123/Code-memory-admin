import { SeoHome } from './../../models/SeoHomeModel';
import { PayloadName } from './loginActionTypes';


export type SubmitSeoHome = Record<PayloadName, { input: SeoHome, callback?: any }>;

export type GetEntireSeoHomeSuccess = Record<PayloadName, { seoHomeEntire: SeoHome[] }>;

export type SubmitSeoHomeSuccess = Record<PayloadName, { seoHome: SeoHome }>;
