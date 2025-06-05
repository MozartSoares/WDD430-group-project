import { IBase } from './Base';

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
}
