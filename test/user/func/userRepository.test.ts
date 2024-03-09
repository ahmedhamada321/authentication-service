import { userRolesEnum } from "./../../../src/interfaces/user";
import { faker } from "@faker-js/faker";
import { minServer } from "../../../src";
import { UserRepository } from "../../../src/repositories/user.repository";
import { IUser } from "../../../src/interfaces/user";

describe(`Testing User Repository`, () => {
  let server = minServer;

  const repo = new UserRepository();

  let user: IUser;

  it(`Should Create New User Successfully`, async () => {
    const userName = faker.person.firstName();
    const name = faker.person.fullName();
    const password = faker.string.alpha({ length: 30 });
    const role = userRolesEnum.USER;

    const repoData = await repo.createNewUser({
      password,
      role,
      email,
    });
    expect(repoData).toHaveProperty("_id");
    expect(repoData.email).toBe(email);
    expect(repoData.role).toBe(role);

    user = repoData;
  });

  it(`Should Update User Successfully`, async () => {
    const newUserEmail = faker.person.firstName();
    const name = faker.person.fullName();
    const password = faker.string.alpha({ length: 30 });
    const role = userRolesEnum.USER;

    const repoData = await repo.updateUser(
      user._id,
      name,
      newUserEmail,
      password,
      role
    );
    expect(repoData.email).toBe(newUserEmail);
    expect(repoData.role).toBe(role);
    user = { ...user, ...repoData };
  });

  it(`Should Find User by User Name`, async () => {
    const repoData = await repo.getUserByEmail(user.newUserEmail);

    if (repoData) {
      expect(repoData.userName).toBe(user.userName);
      expect(repoData.name).toBe(user.userName);
      expect(repoData.role).toBe(user.role);
    } else {
      expect(repoData).toBe(null);
    }
  });

  afterAll(async () => {
    await User.deleteMany();
  });
});
