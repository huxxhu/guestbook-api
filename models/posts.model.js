const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "💁‍♀️ Name is required."],
    },
    content: {
      type: String,
      required: [true, "💁‍♀️ Content is required."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ip: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reply: {
      content: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", schema);
