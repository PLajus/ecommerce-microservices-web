import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateProductOperation = [
  param("id").exists().trim(),
  body("productId").exists(),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
