import {
  createServer,
  IncomingMessage,
  ServerResponse,
  OutgoingHttpHeaders,
} from "http";
import { Utils } from "./Utils";

export class Server {
  public createServer() {
    createServer((req: IncomingMessage, res: ServerResponse) => {
      console.log("got request from: ", req.url?.length);
      const basePath = Utils.getUrlBasePath(req.url);
      res.end(JSON.stringify({ basePath }));
    }).listen(8080);
    console.log("server started");
  }
}
