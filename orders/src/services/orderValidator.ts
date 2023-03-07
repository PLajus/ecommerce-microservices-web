import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewOrder = [
  body("order.*.customerEmail").exists().isEmail(),
  body("order.*.status")
    .optional()
    .isIn(["New", "Pending", "Hold", "Shipped", "Delivered"]),
  body("order.*.addressId").not().isEmpty(),
  body("order.*.paymentId").not().isEmpty(),
  body("order.*.total").exists().isNumeric(),
  body("orderItems").exists(),
  validate,
];

export const validateUpdateOrderStatus = [
  param("id").exists(),
  body("newStatus")
    .exists()
    .isIn(["New", "Pending", "Hold", "Shipped", "Delivered"]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
