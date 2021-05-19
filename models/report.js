const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const ReportSchema = new Schema(
  {
    sender: { type: ObjectId, ref: "User" },
    reportUser: { type: ObjectId, ref: "User" },
    content: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Hold", "Solved"],
      required: true,
      default: "Hold",
    },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    updateAt: { type: Date },
  },
  { collections: "Report" }
);
const ReportModel = model("Report", ReportSchema);

module.exports = ReportModel;
