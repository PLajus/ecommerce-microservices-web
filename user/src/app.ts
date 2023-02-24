import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import { router as users } from "./routes/user.router";

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
    mongoose.connect(process.env.MONGO_URL!, () => {
      console.log("Connected to MongoDB");
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        secret: process.env.SECRET!,
        resave: false,
        saveUninitialized: false,
      })
    );

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    require("./auth/auth");

    this.app.use("/users", users);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`);
    });
  }
}

export default App;
