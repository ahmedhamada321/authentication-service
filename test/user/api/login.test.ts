import { minServer } from "./../../../src/index";
import { IUser } from "../../../src/interfaces/user";
import { graphQLRequestMutationRequest } from "../utils/graphql";
import { createTestUser } from "../utils/user/createNewUser";
import { log } from "console";

describe(`Testing Login GraphQL API`, () => {
  let user: IUser;
  let server = minServer;
  beforeAll(async () => {
    user = await createTestUser(password);
  });

  const password = "NEW_password_FOR_TEST";

  it("Should Return Token, And User Data", async () => {
    const loginData = {
      email: user.email,
      password,
    };

    const graphRequest = await graphQLRequestMutationRequest(
      server.Server.app,
      `{

        login(email:"${loginData.email}", password:"${loginData.password}")  {

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

    const { status, body } = graphRequest;
    console.log(body);
    expect(status).toBe(200);

    // expect(responseData).toHaveProperty("token");
    // expect(responseData).toHaveProperty("user");

    // expect(responseData.user).toHaveProperty("_id");
    // expect(responseData.user).toHaveProperty("email");
    // expect(responseData.user).toHaveProperty("role");

    // expect(responseData.user.email).toBe(user.email);
    // expect(responseData.user._id).toBe(String(user._id));
    // expect(responseData.user.role).toBe(user.role);
  });

  it("Should Return Wrong Password Message If Wrong Data", async () => {
    const loginData = {
      email: user.email,
      password: "WRONG_PASSWORD",
    };
    const graphRequest = await graphQLRequestMutationRequest(
      server.Server.app,
      `{

        login(email:"${loginData.email}", password:"${loginData.password}")  {

           token

           user {
            _id
            email
            role
           }

        }

        }

        `
    ).set("Accept", "application/json");

    expect(graphRequest.body.errors[0].error_key).toBe(
      `email or password wrong`
    );
  });
});
