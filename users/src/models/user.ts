import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  lastActive: {
    type: Date,
    default: new Date(),
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

export default mongoose.model("User", UserSchema);
