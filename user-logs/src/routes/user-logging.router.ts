import express from "express";
import UserLoggingController from "../controllers/user-logs.controller";
import { validateNewLog, validateDelLog } from "../services/validator";

export const router = express.Router();

const logger = new UserLoggingController();

router.use(express.json());

router.get("/", logger.getAll);

router.get("/:user", logger.getUsersLogs);

router.post("/", validateNewLog, logger.createLog);

router.delete("/:id", validateDelLog, logger.daleteLog);
