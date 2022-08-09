const Post = require("../models/posts.model");
const resSuccess = require("../services/success.service");
const { asyncError, appError } = require("../services/error.service");

module.exports = {
  getPosts: async (req, res, next) => {
    const post = await Post.find().sort("createdAt");
    resSuccess({ res, post });
  },
  addPost: asyncError(async (req, res, next) => {
    const {
      ip,
      body: { name, content },
    } = req;

    if (!name || name.trim() === "") {
      return appError(400, "Please enter `name`.", next);
    }
    if (!content || content.trim() === "") {
      return appError(400, "Please enter `content`.", next);
    }
    const newPost = await Post.create({
      name,
      content,
      ip,
    });

    resSuccess({ res, newPost });
  }),
};
