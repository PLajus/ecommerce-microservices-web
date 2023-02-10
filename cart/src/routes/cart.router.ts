import express from "express";
import CartController from "../controllers/cart.controller";

export const router = express.Router();

const cart: CartController = new CartController();

router.use(express.json());

router.get("/:userid", cart.getCart);

router.get("/:userid/:productid", cart.getAmountofProduct);

router.put("/:userid", cart.updateCart);

router.delete("/:userid/:productid", cart.deleteProduct);
