import { minServer } from "./../../../src/index";
import { User } from "./../../../src/DB/models/user";
import { userRolesEnum } from "./../../../src/interfaces/user";
import { faker } from "@faker-js/faker";
import { IUser } from "../../../src/interfaces/user";
// import { conn, server } from "../../../src/app";
import { graphQLRequestMutationRequest } from "../utils/graphql/index";
import { log } from "console";
describe(`Testing create user api `, () => {
  let user: IUser;
  let token: string | undefined;
  let server = minServer;

  it(`should be rutern new user `, async () => {
    const createUserDate = {
      email: faker.string.alpha({ length: 15 }),
      password: faker.string.alpha({ length: 15 }),
      role: userRolesEnum.USER,
    };
    const graphRequest = await graphQLRequestMutationRequest(
      server.Server.app,
      ` 
                {
                  signup(email:"${createUserDate.email}", password:"${createUserDate.password}",role:${createUserDate.role}){
                    user {
                      _id
                      email
                      role
                    }
                    token
        
                    }
                }
                `
    ).set("Accept", "application/json");
    // .set("Authorization", `Bearer ${token}`);

    const {
      status,
      body: {
        data: { signup: responseData },
      },
    } = graphRequest;

    expect(status).toBe(200);
    expect(responseData).toHaveProperty("token");

    expect(responseData.user).toHaveProperty("_id");
    expect(responseData.user).toHaveProperty("email");
    expect(responseData.user).toHaveProperty("role");
  });
  it(`shoud be rutern error message user already exists  `, async () => {
    const createUserDate = {
      email: faker.string.alpha({ length: 15 }),
      password: faker.string.alpha({ length: 15 }),
      role: userRolesEnum.USER,
    };

    const graphRequest = await graphQLRequestMutationRequest(
      server.Server.app,
      ` 
            {
              signup(email:"${createUserDate.email}", password:"${createUserDate.password}",role:${createUserDate.role}){
                    _id ,
                    email ,
                    role 
    
                }
            }
            `
    ).set("Accept", "application/json");

    expect(graphRequest.body.errors[0]).toHaveProperty("message");
  });
});
