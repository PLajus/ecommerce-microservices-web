import { Request, Response, NextFunction } from "express";
import { validationResult, param, body } from "express-validator";

export default class Validator {
  validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  };

  validateIdExists = [param("id").exists().trim(), this.validate];

  validateCreateAd = [
    body("name").exists().trim(),
    body("description").exists().trim(),
    body("expires").optional().isString(),
    this.validate,
  ];

  validateUpdateAdDesc = [
    param("id").exists().trim(),
    body("description").exists().trim(),
    this.validate,
  ];

  validateUpdateAdName = [
    param("id").exists().trim(),
    body("name").exists().trim(),
    this.validate,
  ];

  validateUpdateAdShown = [
    param("id").exists().trim(),
    body("shownCount").exists().trim().isNumeric,
    this.validate,
  ];

  validateUpdateAdExpiration = [
    param("id").exists().trim(),
    body("expires").exists().isISO8601().toDate(),
    this.validate,
  ];
}
