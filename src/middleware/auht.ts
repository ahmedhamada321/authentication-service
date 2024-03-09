import { Request } from "express";
import { sanitizeAndDeleteBearerJWT, verifyJWTToken } from "../utlis/Jwt";
import { GraphQLError } from "graphql";

export const auht = async (req: Request) => {
  try {
    const query = req?.body?.query?.toString();

    if ((query && query.includes("login")) || query.includes("signup")) {
      return {};
    }
    const token = await sanitizeAndDeleteBearerJWT(
      req.headers["authorization"] || ""
    );

    const decode = await verifyJWTToken(token);

    return { decode };
  } catch (error: any) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
export default auht;
