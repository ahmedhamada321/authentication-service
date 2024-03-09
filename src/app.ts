import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import auht from "./middleware/auht";
import { rootResolvers } from "./resolvers";
import { rootSchema } from "./graphql";
const port = process.env.PORT || 2200;

class server {
  app = express();
  applyMiddleware() {
    this.app.use(express.json());
  }

  async bootstrap() {
    const ApolloServerApp = new ApolloServer({
      typeDefs: rootSchema,
      resolvers: rootResolvers,

      introspection: true,
      formatError: (error: any, unError: any = {}) => {
        const code =
          unError.originalError?.status ||
          unError.originalError?.code ||
          error.extensions.code ||
          error?.code ||
          error?.status ||
          error.extensions.code ||
          500;

        const message =
          error.message || error.unError?.message || "An error occured";

        const error_key = unError.originalError?.error_key;

        return { message, code, error_key, status: code };
      },
    });
    await ApolloServerApp.start();

    this.applyMiddleware();
    this.app.use(
      expressMiddleware(ApolloServerApp, {
        context: async ({ req }) => await auht(req),
      })
    );
    this.app.listen(port, () => {
      console.log(`app runing on port ${port}`);
    });
  }
}
export default server;
