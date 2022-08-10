const Post = require("../models/posts.model");
const resSuccess = require("../services/success.service");
const { asyncError, appError } = require("../services/error.service");

module.exports = {
  // Get posts
  getPosts: asyncError(async (req, res, next) => {
    let {
      query: { page = 1, limit = 10 },
    } = req;

    if (!(parseInt(page) >= 1) || !(parseInt(limit) >= 1))
      return appError(400, "`page` & `limit` should be Number.", next);

    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Post.countDocuments();
    const pageTotal = Math.ceil(total / limit);

    if (page > pageTotal)
      return appError(400, "`page` can't be larger than total pages.", next);

    const post = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const pagination = {
      pageIndex: page,
      pageSize: limit,
      pageTotal,
      total,
    };
    resSuccess({ res, data: post, pagination });
  }),
  // Add post
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

    resSuccess({ res, data: newPost });
  }),
};
