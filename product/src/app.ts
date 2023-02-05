import express from "express";
import * as bodyParser from "body-parser";
import Controller from "./controllers/controller";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initializeControllers<Type>(controllers: Type[]): void {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}

export default App;
