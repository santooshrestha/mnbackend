import { body } from "express-validator";

const EmployeeUpdateRule = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("address").notEmpty().withMessage("Address is required"),
    body("is_experienced").isBoolean().withMessage("Invalid data"),
    body("has_vehicles").isBoolean().withMessage("Invalid data"),
    body("has_police_record").isBoolean().withMessage("Invalid data"),
  ];
};

export default EmployeeUpdateRule;
