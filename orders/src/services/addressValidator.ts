import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewAddress = [
  body("address").exists(),
  body("address.type").optional().isIn(["Shipping", "Billing"]),
  body("address.street").exists().not().isEmpty().isString(),
  body("address.city").exists().not().isEmpty().isString(),
  body("address.state").exists().optional().not().isEmpty().isString(),
  body("address.postalCode").exists().not().isEmpty().isPostalCode("any"),
  body("address.country").exists().not().isEmpty().isAlphanumeric(),

  validate,
];

export const validateUpdateAddress = [
  param("id").exists(),
  body("address").exists(),
  oneOf([
    body("address.type").optional().isIn(["Shipping", "Billing"]),
    body("address.street").exists().not().isEmpty().isString(),
    body("address.city").exists().not().isEmpty().isString(),
    body("address.state").exists().optional().not().isEmpty().isString(),
    body("address.postalCode").exists().not().isEmpty().isPostalCode("any"),
    body("address.country").exists().not().isEmpty().isAlphanumeric(),
  ]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
