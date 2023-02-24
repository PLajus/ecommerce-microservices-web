import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
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

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export const User = mongoose.model("User", UserSchema);
