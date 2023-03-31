import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewOrder = [
  body("orderInfo").exists().isObject(),
  body("orderInfo.customerEmail").exists().isEmail(),
  body("orderInfo.status")
    .optional()
    .isIn(["New", "Pending", "Hold", "Shipped", "Delivered"]),
  body("orderInfo.total").exists().isString(),

  body("orderInfo.addressId").exists().not().isEmpty().isNumeric(),
  body("orderInfo.paymentId").exists().not().isEmpty().isNumeric(),

  body("orderItems").exists().isArray(),
  body("orderItems.*.productId").exists().isString(),
  body("orderItems.*.amount").exists().isNumeric(),
  validate,
];

export const validateUpdateOrder = [
  param("id").exists(),
  oneOf([
    body("status")
      .exists()
      .isIn(["New", "Pending", "Hold", "Shipped", "Delivered"]),

    body("addressId").exists().not().isEmpty().isNumeric(),
    body("paymentId").exists().not().isEmpty().isNumeric(),
  ]),
  body("customerEmail").not().exists(),
  body("total").not().exists(),
  body("orderItems").not().exists(),

  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
