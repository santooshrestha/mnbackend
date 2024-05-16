import jwt from "jsonwebtoken";
import { config } from "../../config/";

import { IUser } from "../../interfaces/IUser";

const signAdminJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime = timeSinchEpoch + Number(config.token.expireTime) * 10000;

  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      config.token.adminSecret,
      {
        issuer: config.token.isAdmin,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (err) {}
};

export default signAdminJWT;
