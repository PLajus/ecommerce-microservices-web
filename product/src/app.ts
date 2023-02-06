import express from "express";
import { connectToDatabase } from "./services/database.service";
import { router as products } from "./routes/products.router";

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
    this.app.use("/products", products);
  }

  public listen(): void {
    connectToDatabase()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`Server started at http://localhost:${this.port}`);
        });
      })
      .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
      });
  }
}

export default App;
