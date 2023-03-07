import { Request, Response, NextFunction } from "express";
import { validationResult, param, body, oneOf } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewProduct = [
  body("name").exists().trim(),
  body("category").exists().trim(),
  body("price").exists().trim().isNumeric(),
  body("inStockQuantity").exists().trim().isNumeric(),
  body("description").optional().isString(),
  body("imageFileName").optional().isURL(),

  validate,
];

export const validateUpdateProduct = [
  param("id").exists().trim(),
  oneOf([
    body("description").exists().isString(),
    body("category").exists().isString(),
    body("price").exists().isNumeric(),
    body("imageFileName").exists().isURL(),
    body("inStockQuantity").exists().isNumeric(),
  ]),
  validate,
];

export const validateFindById = [param("id").exists().trim(), validate];
