import userMutationsResolvers from "./mutations/user";
import userQueriesResolver from "./queries/user";

export const rootResolvers = {
  Query: userQueriesResolver,

  Mutation: userMutationsResolvers,
};
