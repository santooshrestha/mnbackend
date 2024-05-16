import express from "express";
import controller from "../controller/Chatbot";

const router = express.Router();

router.route("").post(controller.store).get(controller.get);

const chatbotRoutes = router;
export default chatbotRoutes;
