const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
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
    user: {
      type: Schema.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", schema);
