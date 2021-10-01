const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/edit", (req, res, next) => {
  try {
    // const user = await User.update({});
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.render("edit");
});
module.exports = router;
