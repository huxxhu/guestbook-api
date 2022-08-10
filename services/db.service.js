const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("🎉 Database connected. ─=≡Σ((( つ•̀ω•́)つ");
  })
  .catch((err) => {
    console.log("🤯 Database connection failed. Error message: ", err);
  });
