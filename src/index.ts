import express from "express";

import http from "http";
import Logging from "./library/Logging";

import { config } from "./config";

import mongoose from "mongoose";
import cors from "cors";

import path from "path";

import userRoutes from "./routes/User";
import contactRoutes from "./routes/Contact";
import serviceRoutes from "./routes/Service";
import employeeRoutes from "./routes/Employee";
import chatbotRoutes from "./routes/Chatbot";

const router = express();

router.use(cors());

mongoose
  .connect(config.mongo.url, {
    w: "majority",
    retryWrites: true,
  })
  .then(() => {
    Logging.info("Connected to mongodb");
    StartServer();
  })
  .catch((e) => {
    Logging.error("Unable to Connect");
    Logging.error(e);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    //log the request
    Logging.info(
      `Incomming  -> Method: [${req.method}] - Url: [${req.url}] - IP Address: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      //log the response
      Logging.info(
        `Incomming  -> Method: [${req.method}] - Url: [${req.url}] - IP Address: [${req.socket.remoteAddress}] -States: [${res.statusCode}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  const directory = path.join(__dirname, "../public");
  router.use(express.static(directory));

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Method",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  router.use("/api/user", userRoutes);
  router.use("/api/contact", contactRoutes);
  router.use("/api/service", serviceRoutes);
  router.use("/api/employee", employeeRoutes);
  router.use("/api/chatbot", chatbotRoutes);

  http.createServer(router).listen(config.server.port, () => {
    Logging.info(`Server is running on port ${config.server.port}.`);
  });
};
