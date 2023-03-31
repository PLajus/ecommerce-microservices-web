import express from "express";

import AdvertisementsController from "../controllers/advertisements.controller";
import Validator from "../services/validator";

export const router = express.Router();

const advertisement = new AdvertisementsController();

const validator = new Validator();

router.use(express.json());

router.get("/", advertisement.getAll);

router.get("/:id", validator.validateIdExists, advertisement.getAd);

router.post("/", validator.validateCreateAd, advertisement.createAd);

router.put("/desc/:id", validator.validateIdExists, advertisement.updateAdDesc);

router.put(
  "/name/:id",
  validator.validateUpdateAdName,
  advertisement.updateAdName
);

router.put(
  "/shown/:id",
  validator.validateUpdateAdShown,
  advertisement.updateAdShowCount
);

router.put(
  "/expiration/:id",
  validator.validateUpdateAdExpiration,
  advertisement.updateAdExpiration
);

router.delete("/:id", validator.validateIdExists, advertisement.deleteAd);
