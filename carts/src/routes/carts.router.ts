import express from "express";

import CartsController from "../controllers/carts.controller";
import {
  validateFindById,
  validateCreateCart,
  //   validateProductOperation,
  validateUpdateCart,
} from "../services/validator";

export const router = express.Router();

const carts = new CartsController();

router.use(express.json());

router.get("/:id", validateFindById, carts.getCart);

// router.get("/:id/product", validateProductOperation, carts.getAmountofProduct);

router.post("/:id", validateCreateCart, carts.createCart);

router.put("/:id", validateUpdateCart, carts.updateCart);

router.delete("/:id", validateFindById, carts.deleteCart);

// router.delete("/:id/product", validateProductOperation, carts.removeOneProduct);
