import express from "express";

import AddressController from "../controllers/addresses.controller";
import {
  validateFindById,
  validateNewAddress,
  validateUpdateAddress,
} from "../services/addressValidator";

export const router = express.Router();

const addresses = new AddressController();

router.use(express.json());

router.get("/", addresses.getAll);

router.get("/:id", validateFindById, addresses.getAddress);

router.post("/", validateNewAddress, addresses.createAddress);

router.put("/:id", validateUpdateAddress, addresses.updateAddress);

router.delete("/:id", validateFindById, addresses.deleteAddress);
