import { LoginInput, LoginSlice } from '../../models/LoginModel';

export type PayloadName = 'payload';

export type loginAction = {
  type: string;
  loginInput: LoginInput;
  token: string;
  messageError: string;
};

export type LoginActionInput = Record<
  PayloadName,
  {
    input: LoginInput;
  }
>;

export type LoginOutput = Pick<LoginSlice, 'token' | 'user'>;

export type LoginActionOutput = Record<PayloadName, LoginOutput>;
