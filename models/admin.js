const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AdminSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    updateAt: { type: Date },
  },
  { collections: "Admin" }
);
const AdminModel = model("Admin", AdminSchema);

module.exports = AdminModel;
