const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema(
  {
    answer: { type: String, required: true, trim: true },
    like: { type: Array },
    dislike: { type: Array },
    initVote: { type: Number },
    owner: { type: ObjectId, ref: "User" },
    question: { type: ObjectId, ref: "Question", require: true },
    createAt: { type: Date, required: true, trim: true, default: Date.now() },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
  },
  { collections: "Comment" }
);
const CommentModel = model("Comment", CommentSchema, "Comment");

module.exports = CommentModel;
