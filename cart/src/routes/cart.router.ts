import express from "express";
import CartController from "../controllers/cart.controller";

export const router = express.Router();

const cart = new CartController();

router.use(express.json());

router.get("/user/:userid", cart.getCart.bind(cart));

router.get(
  "/user/:userid/product/:productid",
  cart.getAmountofProduct.bind(cart)
);

router.put("/user/:userid", cart.updateCart.bind(cart));

router.delete("/user/:userid", cart.deleteCart.bind(cart));

router.delete(
  "/user/:userid/product/:productid",
  cart.deleteProduct.bind(cart)
);
