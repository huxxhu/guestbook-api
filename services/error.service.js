// 🕸 App Error Handler (isOperational = true)
const appError = (httpStatusCode, message, next) => {
  const error = new Error(message);
  error.statusCode = httpStatusCode;
  error.isOperational = true;
  next(error);
};

// 🕸 Async Error Handler
const asyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};

module.exports = { appError, asyncError };
