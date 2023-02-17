import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  lastActive: Date;
  status: string;
  isValidPassword: (password: string) => boolean;
}
