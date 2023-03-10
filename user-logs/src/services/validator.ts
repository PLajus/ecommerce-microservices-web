import { Request, Response, NextFunction } from "express";
import { check, validationResult, param, oneOf, body } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewLog = [
  check("user").exists().trim().escape(),
  check("request").exists().trim(),
  check("params").optional().trim(),
  validate,
];

export const validateUpdateLog = [
  param("id").exists().trim(),
  oneOf([
    body("user").exists().trim(),
    body("request").exists().trim(),
    body("params").exists().trim(),
  ]),
];

export const validateGetUserLog = [param("user").exists().trim(), validate];

export const validateFindById = [param("id").exists().trim(), validate];
