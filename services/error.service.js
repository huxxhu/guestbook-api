// App Error Handler (isOperational = true)
const appError = (httpStatusCode, message, next) => {
  const error = new Error(message);
  error.statusCode = httpStatusCode;
  error.isOperational = true;
  next(error);
};

// Async Error Handler
const asyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};

// Dev Error Handler
const resDevError = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Production Error Handler
const resProdError = (err, res) => {
  if (err.name === "ValidationError") {
    err.message = "✏️ Validation Error";
    err.isOperational = true;
  }

  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  // !isOperational
  console.error("⚠️ ERROR!!!!!", err);

  res.status(500).json({
    status: "error",
    message: "😭 System Error...",
  });
};

// Response Error Handler
const resError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resDevError(err, res);
  }
  resProdError(err, res);
};

module.exports = { appError, asyncError, resError };
