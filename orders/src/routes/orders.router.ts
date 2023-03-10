import express from "express";

import OrdersController from "../controllers/orders.controller";
import {
  validateFindById,
  validateNewOrder,
  validateUpdateOrder,
} from "../services/orderValidator";

export const router = express.Router();

const orders = new OrdersController();

router.use(express.json());

router.get("/", orders.getAll);

router.get("/:id", validateFindById, orders.getOrder);

router.post("/", validateNewOrder, orders.createOrder);

router.put("/:id", validateUpdateOrder, orders.updateOrder);

router.delete("/:id", validateFindById, orders.deleteOrder);
