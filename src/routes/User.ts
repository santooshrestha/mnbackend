import express from "express";

import controller from "../controller/User";
import UserRegisterRule from "../middleware/validators/User/UserRegisterRule";
import { validate } from "../middleware/validators";

const router = express.Router();

router.post("/register", UserRegisterRule(), validate, controller.register);
router.post("/login", controller.login);

export default router;
