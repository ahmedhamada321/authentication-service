import { userRolesEnum, IUser } from "./../../interfaces/user";
import { Schema, model, Document } from "mongoose";

export type UserDocument = Document & IUser;
const userSchema = new Schema(
  {
    name: {
      type: String,
      reuired: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [userRolesEnum.ADMIN, userRolesEnum.USER],
      default: userRolesEnum.USER,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserDocument>("User", userSchema);

export default User;
