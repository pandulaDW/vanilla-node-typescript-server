import { IncomingMessage, ServerResponse } from "http";
import { Account, Handler, TokenGenerator } from "./Model";

export class LoginHandler implements Handler {
  private req: IncomingMessage;
  private res: ServerResponse;
  private tokenGenerator: TokenGenerator;

  public constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenGenerator: TokenGenerator
  ) {
    this.req = req;
    this.res = res;
    this.tokenGenerator = tokenGenerator;
  }

  public async handleRequest(): Promise<void> {
    try {
      const body = await this.getRequestBody();
      const sessionToken = await this.tokenGenerator.generateToken(body);
      if (sessionToken) {
        this.res.end("valid credentials");
      } else {
        this.res.end("wrong credentials");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  private getRequestBody(): Promise<Account> {
    return new Promise((resolve, reject) => {
      let body: string = "";
      this.req.on("data", (data: string) => {
        body += data;
      });
      this.req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      this.req.on("error", (err) => {
        reject(err);
      });
    });
  }
}
