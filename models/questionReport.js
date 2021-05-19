const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const ReportQuestionSchema = new Schema(
  {
    sender: { type: ObjectId, ref: "User" },
    reportQuestion: { type: ObjectId, ref: "Question" },
    content: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Hold", "Approved", "Rejected"],
      required: true,
      default: "Hold",
    },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    updateAt: { type: Date },
  },
  { collections: "ReportQuestion" }
);
const ReportQuestionModel = model("ReportQuestion", ReportQuestionSchema);

module.exports = ReportQuestionModel;
