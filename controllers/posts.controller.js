const Post = require("../models/posts.model");
const success = require("../services/success.service");
const { asyncError, appError } = require("../services/error.service");

module.exports = {
  getPosts: async (req, res, next) => {
    const post = await Post.find().sort("createdAt");
    success({ res, post });
  },
  addPost: asyncError(async (req, res, next) => {
    const { name, content } = req.body;
    if (!name || name.trim() === "") {
      return appError(400, "Please enter `name`.", next);
    }
    if (!content || content.trim() === "") {
      return appError(400, "Please enter `content`.", next);
    }
    const newPost = await Post.create({
      name,
      content,
    });

    success({ res, newPost });
  }),
};
