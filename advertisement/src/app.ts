import "dotenv/config";

import express from "express";

import { router as advertisement } from "./routes/advertisement.router";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/ad", advertisement);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}

export default App;
