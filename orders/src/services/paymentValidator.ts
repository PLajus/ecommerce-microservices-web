import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewPayment = [
  body("payment.*.provider").not().isEmpty().isString(),
  body("payment.*.status").optional().isIn(["Pending", "Paid", "Canceled"]),
  body("payment.*.addressId").exists(),
  validate,
];

export const validateUpdatePayment = [
  param("id").exists(),
  oneOf([
    body("payment.*.provider").exists().isString(),
    body("payment.*.status").exists().isIn(["Pending", "Paid", "Canceled"]),
    body("payment.*.addressId").exists().not().isEmpty(),
  ]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
