import { body } from "express-validator";
import Employee from "../../../models/Employee";

const EmployeeAddRule = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (value) => {
        const user = await Employee.findOne({ email: value });

        if (user) {
          return Promise.reject("Email has already been taken");
        }
      }),
    body("contact_number")
      .notEmpty()
      .withMessage("Contact number is required")
      .bail()
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact number has 10 digits")
      .custom(async (value) => {
        const user = await Employee.findOne({ contact_number: value });

        if (user) {
          return Promise.reject("Contact number has already been taken");
        }
      }),
    body("address").notEmpty().withMessage("Address is required"),
    body("is_experienced").isBoolean().withMessage("Invalid data"),
    body("has_vehicles").isBoolean().withMessage("Invalid data"),
    body("has_police_record").isBoolean().withMessage("Invalid data"),
  ];
};

export default EmployeeAddRule;
