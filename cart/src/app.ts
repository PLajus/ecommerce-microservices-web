import "dotenv/config";

import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { router as cart } from "./routes/cart.router";

class App {
  public app: express.Application;
  public port: number;
  private swaggerDocument: any;

  constructor(port: number, openapi: string) {
    this.app = express();
    this.port = port;
    this.swaggerDocument = YAML.load(openapi);

    this.initializeMiddlewares();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use("/", swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
    this.app.use("/cart", cart);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}

export default App;
