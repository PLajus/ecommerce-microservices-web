import * as dotenv from "dotenv";
import App from "./app";

dotenv.config();

const app = new App(process.env.PORT ? process.env.PORT : 3000);

app.listen();
