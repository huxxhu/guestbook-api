const resSuccess = require("../services/success.service");
const { asyncError, appError } = require("../services/error.service");

module.exports = {
  login: asyncError(async (req, res, next) => {
    const {
      body: { password },
    } = req;

    if (!password || password.trim() === "") {
      return appError(400, "Please enter `password`.", next);
    }

    // Compare password
    // TODO: Create real auth when user feature done.
    if (password !== process.env.ADMIN_TOKEN) {
      return next(appError(400, "🚷 Password is invalid.", next));
    }

    resSuccess({
      res,
      data: {
        token: password,
      },
    });
  }),
};
