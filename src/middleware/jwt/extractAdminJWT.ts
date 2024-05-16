import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const extractAdminJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, config.token.adminSecret, (error, data) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.admin = data;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }
};

export default extractAdminJWT;
