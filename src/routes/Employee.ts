import express from "express";

import controller from "../controller/Employee";
import { validate } from "../middleware/validators";
import EmployeeAddRule from "../middleware/validators/Employee/EmployeAddRule";
import extractAdminJWT from "../middleware/jwt/extractAdminJWT";
import EmployeeUpdateRule from "../middleware/validators/Employee/EmployeeUpdateRule";

const router = express.Router();

router
  .route("")
  .post(EmployeeAddRule(), validate, controller.store)
  .get(extractAdminJWT, controller.get);

router
  .route("/:id")
  .put(extractAdminJWT, EmployeeUpdateRule(), validate, controller.update)
  .delete(extractAdminJWT, controller.destroy);

const employeeRoutes = router;

export default employeeRoutes;
