import express from "express";

import controller from "../controller/Contact";
import ContactAddRule from "../middleware/validators/Contact/ContactAddRule";
import { validate } from "../middleware/validators";
import extractAdminJWT from "../middleware/jwt/extractAdminJWT";
import ContactMailRule from "../middleware/validators/Contact/ContactMailRule";

const router = express.Router();

router
  .route("")
  .post(ContactAddRule(), validate, controller.store)
  .get(extractAdminJWT, controller.get);

router.delete("/:id", extractAdminJWT, controller.destroy);
router.post(
  "/send-mail",
  extractAdminJWT,
  ContactMailRule(),
  validate,
  controller.sendMail
);

const contactRoutes = router;

export default contactRoutes;
