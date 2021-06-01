const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ObjectId = Schema.ObjectId;

const QuestionSchema = new Schema(
  {
    topic: { type: Array },
    question: { type: String, required: true },
    owner: { type: String, ref: "User", require: true },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
  },
  { collections: "Question" }
);
const QuestionModel = model("Question", QuestionSchema, "Question");

module.exports = QuestionModel;
