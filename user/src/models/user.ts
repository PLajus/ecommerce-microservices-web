import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDoc } from "./IUser";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastActive: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  status: {
    type: String,
    enum: ["New", "Active", "Closed", "Banned"],
    default: "New",
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const User = mongoose.model<UserDoc>("User", UserSchema);
