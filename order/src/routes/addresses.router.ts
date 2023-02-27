import express from "express";
import AddressController from "../controllers/addresses.controller";

export const router = express.Router();

const addresses = new AddressController();

router.use(express.json());

router.get("/", addresses.getAll);

router.get("/:id", addresses.getAddress);

router.post("/", addresses.createAddress);

router.put("/:id", addresses.updateAddress);

router.delete("/:id", addresses.deleteAddress);
