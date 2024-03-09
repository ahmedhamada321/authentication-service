import { userRolesEnum } from "./../../../../src/interfaces/user";
import { faker } from "@faker-js/faker";
import { UserRepository } from "../../../../src/repositories/user.repository";
import { generateJWTToken } from "../../../../src/utlis/Jwt";

const userRepo = new UserRepository();

export const createTestUser = async (
  password = faker.string.alpha({ length: 10 }),
  role: userRolesEnum = userRolesEnum.USER
) => {
  const user = await userRepo.createNewUser({
    email: faker.string.alpha({ length: 22 }),
    password,
    role,
  });

  return user;
};

export const createAdminAndGetToken = async () => {
  const user = await createTestUser();
  const token = generateJWTToken(user);

  return { token, user };
};
