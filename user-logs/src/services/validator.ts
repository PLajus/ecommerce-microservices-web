import { Request, Response, NextFunction } from "express";
import { check, validationResult, param } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewLog = [
  check("user").exists().trim().escape(),
  check("request").exists().trim(),
  check("params").exists().trim(),
  validate,
];

export const validateGetUserLog = [param("user").exists().trim(), validate];

export const validateDelLog = [param("id").exists().trim(), validate];
