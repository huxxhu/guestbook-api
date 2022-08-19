const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { resError } = require("./services/error.service");

const postsRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");

const app = express();

require("dotenv").config();
require("./services/db.service.js");

const whitelist = [
  process.env.REACT_APP_LOCAL_URL,
  process.env.REACT_APP_PROD_URL,
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`🚷 CORS block origin: ${origin} is trying to connect.`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.set("trust proxy", true);
app.use(cors(corsOptions));

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

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

// Error handler
app.use((err, req, res, next) => {
  resError(err, res);
});

module.exports = app;
