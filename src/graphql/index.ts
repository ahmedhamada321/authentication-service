import { userMutation } from "./mutations/user.mutation";
import { userQuery } from "./queries/user.query";
import { userType } from "./types/user.type";
export const rootSchema = `


${userType}
type Mutation {
    ${userMutation}
}
type Query {
    ${userQuery}
}

`;
