const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const ReportSchema = new Schema(
  {
    reporter: { type: ObjectId, ref: "User" },
    reported: { type: ObjectId, refPath: "reportedType" },
    reportedType: { type: String, enum: ["Question", "User", "Comment"] },
    reportDetail: { type: Array },
    status: {
      type: String,
      enum: ["Hold", "Solved"],
      required: true,
      default: "Hold",
    },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
  },
  { collections: "ReportLog" }
);
const ReportModel = model("ReportLog", ReportSchema, "ReportLog");

module.exports = ReportModel;
