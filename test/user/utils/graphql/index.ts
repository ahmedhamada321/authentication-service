import supertest from "supertest";

const graphQLRequestQueryRequest = (mainServer: any, query: string) => {
  return supertest(mainServer)
    .post("/graphql")
    .send({
      query: `query ${query}`,
    });
};
const graphQLRequestMutationRequest = (mainServer: any, mutation: string) => {
  return supertest(mainServer)
    .post("/graphql")
    .send({
      query: `mutation ${mutation}`,
    });
};
export { graphQLRequestMutationRequest, graphQLRequestQueryRequest };
