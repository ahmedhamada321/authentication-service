import { userRolesEnum } from "./../interfaces/user";
import { Types } from "mongoose";

export type LoginDTO = {
  email: string;
  password: string;
};

export type creatUserDTO = {
  email: string;
  password: string;
  role: userRolesEnum;
};

export type updateUserDTO = {
  name: string;
  email: string;
  password: string;
  role: userRolesEnum;
  id: Types.ObjectId;
};
