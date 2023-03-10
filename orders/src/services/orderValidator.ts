import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewOrder = [
  body("customerEmail").exists().isEmail(),
  body("status")
    .optional()
    .isIn(["New", "Pending", "Hold", "Shipped", "Delivered"]),
  body("total").exists().isNumeric(),

  body("addressId").exists().not().isEmpty(),
  body("paymentId").exists().not().isEmpty(),

  body("orderItems").exists().isArray(),
  body("orderItems.*.productId").exists().isString(),
  body("orderItems.*.amount").exists().isNumeric(),
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
