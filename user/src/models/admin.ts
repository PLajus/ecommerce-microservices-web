import mongoose from "mongoose";
import { User } from "./user";

export const Admin = User.discriminator(
  "Admin",
  new mongoose.Schema({
    role: String,
  })
);
