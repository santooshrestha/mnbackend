import { body } from "express-validator";

const ContactMailRule = () => {
  return [
    body("subject")
      .notEmpty()
      .withMessage("Subject is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Subject must be at least 3 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email format"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .bail()
      .isLength({ min: 15 })
      .withMessage("Description must be at least 15 characters"),
  ];
};

export default ContactMailRule;
