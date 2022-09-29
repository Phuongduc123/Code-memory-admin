import { User } from './UserModel';

export interface LoginInput {
  credential: String;
  password: String;
}

export interface LoginOutput {
  token: string;
  User: User;
}

export interface Login {
  token?: string;
  messageError?: string;
}

export type LoginHashCookie = {
  token: string;
};

export interface LoginSlice {
  token?: string;
  messageError?: string;
  user: User;
  loadingLogin: boolean;
}
