const express = require("express");
const router = express.Router();

router.use(require("./posts.route"));
router.use(require("./users.route"));

module.exports = router;
