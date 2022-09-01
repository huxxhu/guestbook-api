const { asyncError, appError } = require("../services/error.service");
const isAuth = asyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(appError(401, "🗝 Please login.", next));
  }

  // WIP
  // TODO: Create real auth when user feature done.
  if (token !== process.env.ADMIN_TOKEN) {
    return next(appError(400, "🚷 Token is invalid.", next));
  }
  console.log(`👻 ${req.ip} is welcome to play around! 🤘🤘🤘`);

  next();
});

module.exports = { isAuth };
