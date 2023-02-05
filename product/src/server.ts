import * as dotenv from "dotenv";
import App from "./app";
import ProductsController from "./controllers/products-controller";

dotenv.config();

const app = new App(
  [new ProductsController()],
  process.env.PORT ? +process.env.PORT : 3000
);

app.listen();

// const app: Express = express();

// app.use("/products", products);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
