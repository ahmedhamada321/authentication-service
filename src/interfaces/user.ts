import { Types } from "mongoose";

export enum userRolesEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  _id: Types.ObjectId;
  password: string;
  email: string;
  role: userRolesEnum;
}
