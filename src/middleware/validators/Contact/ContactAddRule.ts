import { body } from "express-validator";

const ContactAddRule = () => {
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
      .withMessage("Invalid email format"),
    body("contact_number")
      .notEmpty()
      .withMessage("Contact number is required")
      .bail()
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact number has 10 digits"),
    body("message")
      .notEmpty()
      .withMessage("Message must not be empty")
      .bail()
      .isLength({ min: 15 })
      .withMessage("Message must be at least 15 characters"),
  ];
};

export default ContactAddRule;
