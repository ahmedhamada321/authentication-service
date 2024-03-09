import { IUser, userRolesEnum } from "./../interfaces/user";
import { User } from "./../DB/models/user";
import { hash } from "bcrypt";
import { ProjectionFields, Types } from "mongoose";
// import { destroyAuthUserFromCaching } from "../cache/user";

export class UserRepository {
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).lean();

    return user;
  }

  async createNewUser({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: userRolesEnum;
  }): Promise<IUser> {
    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return user;
  }

  async updateUser(
    id: Types.ObjectId,
    name?: string,
    email?: string,
    password?: string,
    role?: userRolesEnum
  ): Promise<IUser> {
    if (password) {
      const hashedPassword = await hash(password, 12);
      password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { name, role, password, email },
      { new: true }
    );

    if (!user) throw new Error(`No User is found`);

    // await destroyAuthUserFromCaching(id);
    return user;
  }

  async getAllUsers(page: number, limit: number = 10): Promise<IUser[] | null> {
    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;
    const users = await User.find().limit(limit).skip(skip).lean();
    return users;
  }

  async getUserById(
    _id: Types.ObjectId | string,
    projection?: ProjectionFields<IUser>
  ) {
    if (projection) return User.findOne({ _id }).select(projection).lean();

    return User.findOne({ _id }).lean();
  }
}

const userRepository = new UserRepository();

export { userRepository };
