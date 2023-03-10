import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewPayment = [
  body("provider").not().isEmpty().isString(),
  body("status").optional().isIn(["Pending", "Paid", "Canceled"]),
  body("addressId").exists(),
  validate,
];

export const validateUpdatePayment = [
  param("id").exists(),
  oneOf([
    body("provider").exists().isString(),
    body("status").exists().isIn(["Pending", "Paid", "Canceled"]),
    body("addressId").exists().not().isEmpty(),
  ]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
