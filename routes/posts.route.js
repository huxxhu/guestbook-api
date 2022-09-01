const express = require("express");
const router = express.Router();
const PostsControllers = require("../controllers/posts.controller");
const { isAuth } = require("../middlewares/auth");

router.get("/posts", PostsControllers.getPosts);
router.post("/post", PostsControllers.addPost);
router.patch("/admin/post/:id/reply", isAuth, PostsControllers.replyPost);

module.exports = router;
