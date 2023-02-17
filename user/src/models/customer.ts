import mongoose from "mongoose";
import { User } from "./user";

export const Customer = User.discriminator(
  "Customer",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  })
);
