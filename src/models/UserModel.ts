export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CREATOR = 'CREATOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PAUSE = 'PAUSE',
  BLOCK = 'BLOCK',
}

export interface User {
  avatar?: string;
  email?: string;
  facebook?: string;
  firstName?: string;
  gender?: Gender;
  id?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  roles?: Role[];
  status?: UserStatus;
}

export type UserHashCookie = {
  user: User;
};
