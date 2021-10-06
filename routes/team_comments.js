const express = require("express");
const TeamComments = require("../models/team_comments");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
