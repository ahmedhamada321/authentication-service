import { userRepository } from "../repositories/user.repository";
import { generateJWTToken } from "../utlis/Jwt";
import { IUser, userRolesEnum } from "./../interfaces/user";

import { compare } from "bcrypt";
import { Types } from "mongoose";

export class UserService {
  private userRepository = userRepository;

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new Error(`email or password wrong`);
    ////
    const comparingPassword = await compare(password, user.password);

    if (!comparingPassword) throw new Error(`email or password wrong`);

    const { _id, role } = user;
    const token = generateJWTToken({ _id, role });
    return {
      token,
      user,
    };
  }

  async signup({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: userRolesEnum;
  }): Promise<{ token: string; user: IUser }> {
    const oldUser = await this.userRepository.getUserByEmail(email);
    if (oldUser) throw new Error(`USER Already Exists`);

    const user = await this.userRepository.createNewUser({
      email,
      password,
      role,
    });
    if (!user) throw new Error(`SOMETHING WRONG`);
    const { _id } = user;
    const token = generateJWTToken({ _id, role });
    return { token, user };
  }

  async UptateUser(
    id: Types.ObjectId,
    name?: string,
    email?: string,
    password?: string,
    role?: userRolesEnum
  ) {
    const user = await this.userRepository.updateUser(
      id,
      name,
      email,
      password,
      role
    );

    if (!user) throw new Error(`SOMETHING WRONG`);
    return user;
  }

  async userList(page: number, limet: number) {
    const users = await this.userRepository.getAllUsers(page, limet);
    if (!users) throw new Error(`SOMETHING WRONG`);
    return users;
  }
}
