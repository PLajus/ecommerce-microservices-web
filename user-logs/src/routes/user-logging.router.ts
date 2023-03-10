import express from "express";

import UserLoggingController from "../controllers/user-logs.controller";
import {
  validateNewLog,
  validateFindById,
  validateGetUserLog,
  validateUpdateLog,
} from "../services/validator";

export const router = express.Router();

const logger = new UserLoggingController();

router.use(express.json());

router.get("/", logger.getAll);

router.get("/:id", validateFindById, logger.getLog);

router.get("/:user", validateGetUserLog, logger.getUsersLogs);

router.post("/", validateNewLog, logger.createLog);

router.put("/:id", validateUpdateLog, logger.updateLogRequest);

router.delete("/:id", validateFindById, logger.daleteLog);
