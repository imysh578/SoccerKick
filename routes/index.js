const express = require("express");
const User = require("../models/users");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser("12345!@#$%"));

router.get("/", async (req, res, next) => {
  try {
    res.render("main");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
