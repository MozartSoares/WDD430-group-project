import type { IBase } from "../Base";

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  biography?: string;
  imageUrl?: string;
}
