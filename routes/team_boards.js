const express = require("express");
const TeamBoards = require("../models/team_boards");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await TeamBoards.findAll();
    res.render('team_board', {posts});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
