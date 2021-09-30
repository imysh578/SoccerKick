const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/user", (req, res) => {
  router.render("uset.html");
});

module.exports = router;
