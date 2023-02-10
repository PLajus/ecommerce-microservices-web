import express from "express";
import ProductsController from "../controllers/products.controller";

export const router = express.Router();

const products: ProductsController = new ProductsController();

router.use(express.json());

router.get("/", products.getAllProducts);

router.get("/:id", products.getProduct);

router.post("/", products.createProduct);

router.put("/:id", products.updateProduct);

router.delete("/:id", products.deleteProduct);
