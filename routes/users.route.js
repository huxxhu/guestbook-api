const express = require("express");
const router = express.Router();
const UsersControllers = require("../controllers/users.controller");

router.post("/login", UsersControllers.login);

module.exports = router;
