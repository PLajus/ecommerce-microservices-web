import express from "express";
import PaymentsController from "../controllers/payments.controller";

export const router = express.Router();

const payments = new PaymentsController();

router.use(express.json());

router.get("/", payments.getAll);

router.get("/:id", payments.getPayment);

router.post("/", payments.createPayment);

router.put("/:id", payments.updatePayment);

router.delete("/:id", payments.deletePayment);
