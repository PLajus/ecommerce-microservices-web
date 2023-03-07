import express from "express";
import ProductController from "../controllers/products.controller";
import {
  validateNewProduct,
  validateFindById,
  validateUpdateProduct,
} from "../services/validator";

export const router = express.Router();

const products: ProductController = new ProductController();

router.use(express.json());

router.get("/", products.getAllProducts);

router.get("/:id", validateFindById, products.getProduct);

router.post("/", validateNewProduct, products.createProduct);

router.put("/:id", validateUpdateProduct, products.updateProduct);

router.delete("/:id", validateFindById, products.deleteProduct);
