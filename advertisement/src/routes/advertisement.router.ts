import express from "express";
import AdvertisementController from "../controllers/advertisement.controller";

export const router = express.Router();

const advertisement = new AdvertisementController();

router.use(express.json());

router.get("/", advertisement.getAllAds);

router.get("/:id", advertisement.getAd);

router.post("/", advertisement.createAd);

router.put("/desc", advertisement.updateAdDesc);

router.put("/name", advertisement.updateAdName);

router.put("/shown", advertisement.updateAdShowCount);

router.put("/expiration", advertisement.updateAdExpiration);

router.delete("/:id", advertisement.daleteAd);
