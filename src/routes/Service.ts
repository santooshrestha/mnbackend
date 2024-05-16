import express from "express";
import ServiceAddRule from "../middleware/validators/Service/ServiceAddRule";
import { validate } from "../middleware/validators";
import controller from "../controller/Service";
import extractAdminJWT from "../middleware/jwt/extractAdminJWT";

const router = express.Router();

router
  .route("")
  .post(ServiceAddRule(), validate, controller.store)
  .get(extractAdminJWT, controller.get);

router.put("/dispatch", extractAdminJWT, controller.dispatch);
router.put("/cancel", extractAdminJWT, controller.cancel);
router.put("/complete", extractAdminJWT, controller.complete);

router.route("/:id").delete(extractAdminJWT, controller.destroy);

const serviceRoutes = router;

export default serviceRoutes;
