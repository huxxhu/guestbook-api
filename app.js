const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const postsRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");

const app = express();

require("dotenv").config();
require("./services/db.service.js");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use(postsRouter);
app.use(usersRouter);

// Path not found
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "😵 404 not found.",
  });
});

module.exports = app;
