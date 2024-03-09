import connctionDb from "./DB/connction";
import server from "./app";

class AuthServer {
  Server = new server();

  async start() {
    await this.Server.bootstrap();
    await connctionDb();
  }
}
export const minServer = new AuthServer();
minServer.start();
