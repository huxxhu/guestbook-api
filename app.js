const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");

const { appError } = require("./services/error.service");

const app = express();

require("dotenv").config();
require("./services/db.service.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "😵 404 not found.",
  });
});

module.exports = app;
