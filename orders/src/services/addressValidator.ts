import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewAddress = [
  body("type").optional().isIn(["Shipping", "Billing"]),
  body("street").exists().not().isEmpty().isString(),
  body("city").exists().not().isEmpty().isString(),
  body("state").optional().isString(),
  body("postcode").exists().not().isEmpty().isPostalCode("any"),
  body("country").exists().not().isEmpty().isString(),

  validate,
];

export const validateUpdateAddress = [
  param("id").exists(),
  oneOf([
    body("type").exists().isIn(["Shipping", "Billing"]),
    body("street").exists().not().isEmpty().isString(),
    body("city").exists().not().isEmpty().isString(),
    body("state").exists().not().isEmpty().isString(),
    body("postcode").exists().not().isEmpty().isPostalCode("any"),
    body("country").exists().not().isEmpty().isString(),
  ]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
