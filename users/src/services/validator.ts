import { Request, Response, NextFunction } from "express";
import { check, validationResult, param } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

export const validateNewUser = [
  check("email").exists().trim().isEmail(),
  check("password").exists().trim().isStrongPassword(),
  validate,
];

export const validateDelUser = [param("id").exists().trim(), validate];
