import { minServer } from "./../../../src/index";
import { IUser } from "../../../src/interfaces/user";
import { graphQLRequestQueryRequest } from "../utils/graphql";

describe(`Testing get all users api `, () => {
  let user: IUser;
  let server = minServer;

  it(`should be ruturn list of users `, async () => {
    const graphql = await graphQLRequestQueryRequest(
      server.Server.app,
      `
        getAllUsers {
 getAllUsers{ _id,
  name,
  role ,
  userName
}
  }

    `
    )
      .set("Accept", "application/json")
      .set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWhtZWQiLCJfaWQiOiI2NWNlYTI0MjY4ZjZiYTYxNWJlMGM3NTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDg0NjI4MzcsImV4cCI6MTcxMTA1NDgzN30.0lAfIg5ydWrn7am5A2DJaIsL2-nyH0bSjdNDF4QPZZg`
      );

    const {
      status,
      body: {
        data: { getAllUsers: responseData },
      },
    } = graphql;

    expect(status).toBe(200);
    expect(responseData).toHaveLength;
    expect(responseData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          role: expect.any(String),
          userName: expect.any(String),
        }),
      ])
    );
  });
});
