const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    friend: { type: Array },
    gender: { type: String, trim: true },
    password: { type: String, required: true, trim: true },
    banStatus: { type: Boolean, trim: true, required: true, default: false },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      required: true,
      default: "Member",
    },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    updateAt: { type: Date },
  },
  { collections: "User" }
);
const UserModel = model("User", UserSchema);

module.exports = UserModel;
