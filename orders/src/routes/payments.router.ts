import express from "express";

import PaymentsController from "../controllers/payments.controller";
import {
  validateFindById,
  validateNewPayment,
  validateUpdatePayment,
} from "../services/paymentValidator";

export const router = express.Router();

const payments = new PaymentsController();

router.use(express.json());

router.get("/", payments.getAll);

router.get("/:id", validateFindById, payments.getPayment);

router.post("/", validateNewPayment, payments.createPayment);

router.put("/:id", validateUpdatePayment, payments.updatePayment);

router.delete("/:id", validateFindById, payments.deletePayment);
