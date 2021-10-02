const express = require("express");

const User = require("../models/user");

const router = express.Router();

router
  .get("/edit/:id", async (req, res, next) => {
    User.query("SELECT*FORM user");
  })
  .post("/edit/:id", async (res, req, next) => {
    try {
      const user = await User.update(
        { user_id: skh01047 },
        { where: { user_id: skh01046 } }
      );
    } catch (err) {
      console.error(err);
    }
  });

module.exports = router;
