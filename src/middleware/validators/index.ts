import { validationResult } from "express-validator";
import e, { Request, Response, NextFunction } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  }
  var errors = {};
  err.array().map((err: any) => (errors = { ...errors, [err.path]: err.msg }));
  return res.status(400).json({
    message: "Invalid data",
    errors,
  });
};
