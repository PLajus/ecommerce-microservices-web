import express from "express";
import OrdersController from "../controllers/orders.controller";

export const router = express.Router();

const orders = new OrdersController();

router.use(express.json());

router.get("/", orders.getAll);

router.get("/:id", orders.getOrder);

router.post("/", orders.createOrder);
