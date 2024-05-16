import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User";
import mongoose from "mongoose";
import signAdminJWT from "../library/jwt/signAdminJWT";

const register = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  try {
    bcryptjs.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          error: err,
        });
      }

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        username,
        email,
        password: hash,
        type: "Admin",
      });

      await user.save();

      return res.status(200).json({
        message: "User has been created",
        success: true,
      });
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    }).select({ email: 1, password: 1, name: 1, username: 1, type: 1 });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const verified = await bcryptjs.compare(password, user.password);

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    signAdminJWT(user, (err, token) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      res.status(200).json({
        success: true,
        user,
        token,
      });
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err,
      message: err.message,
    });
  }
};

const controller = { register, login };

export default controller;
