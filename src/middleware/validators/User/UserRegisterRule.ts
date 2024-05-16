import { body } from "express-validator";
import User from "../../../models/User";

const UserRegisterRule = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({ username: value });

        if (user) {
          return Promise.reject("Username has already been taken");
        }
      }),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email format")
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          return Promise.reject("Email has already been taken");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .bail(),
    body("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("Password confirmation is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password confirmation must be at least 6 characters")
      .bail()
      .custom(async (value, { req }) => {
        const { password } = req.body;

        if (password !== value) {
          throw new Error("Passwords must match");
        }
      }),
  ];
};

export default UserRegisterRule;
