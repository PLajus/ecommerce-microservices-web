import express from "express";
import mongoose from "mongoose";
import { router as products } from "./routes/products.router";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
  }

  public connectToDB(): void {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI_LOCAL!)
      .then(() => console.log("Connected to MongoDB"));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/products", products);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}

export default App;
