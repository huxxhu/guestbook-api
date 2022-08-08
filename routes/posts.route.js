const express = require("express");
const PostsControllers = require("../controllers/posts.controller");

const router = express.Router();

// Get all posts
router.get("/posts", PostsControllers.getPosts);
router.post("/post", PostsControllers.addPost);

module.exports = router;
