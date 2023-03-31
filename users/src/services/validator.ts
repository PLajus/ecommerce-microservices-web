import { Request, Response, NextFunction } from "express";
import { validationResult, param, body } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewUser = [
  body("email").exists().trim().isEmail(),
  // body("password").exists().trim().isStrongPassword(),
  body("password").exists().trim().isString(),
  validate,
];

export const validateUpdateSatus = [
  param("id").exists().not().isEmpty(),
  body("status").exists().isIn(["New", "Active", "Closed", "Banned"]),
  validate,
];

export const validateDelUser = [param("id").exists().trim(), validate];
