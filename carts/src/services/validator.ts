import { Request, Response, NextFunction } from "express";
import { validationResult, param, body } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateCreateCart = [
  param("id").exists().trim(),
  body("items").exists().isArray(),
  body("items.*.productId").exists(),
  body("items.*.amount").exists().isNumeric(),
  body("total").optional().isString(),
  validate,
];

export const validateUpdateCart = [
  param("id").exists().trim(),
  body("total").exists().isString(),
  validate,
];
export const validateProductOperation = [
  param("id").exists().trim(),
  body("productId").exists(),
  validate,
];
export const validateFindById = [param("id").exists().trim(), validate];
