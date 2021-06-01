const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    _id: { type: String },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    friend: { type: Array },
    topic: { type: Array },
    gender: { type: String, trim: true },
    banStatus: { type: Boolean, trim: true, required: true, default: false },
    birth: { type: Date, trim: true },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      required: true,
      default: "Member",
    },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
  },
  { collection: "User" }
);
const UserModel = model("User", UserSchema, "User");

module.exports = UserModel;
