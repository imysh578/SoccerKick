const express = require("express");
const User = require("../models/user");

const router = express.Router();

router
  .get("/", async (req, res, next) => {
    try {
      // Teams 테이블 쿼리 후 teams 변수에 대입
      const user = await User.findAll();

      res.render("user.html", { user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const users = await User.create({
        user_id: req.body.user_id,
        user_password: req.body.user_password,
        user_name: req.body.team_name,
        user_age: req.body.user_age,
        user_area: req.body.user_area,
        user_gender: req.body.user_gender,
        user_mail: req.body.user_mail,
        user_position: req.body.user_position,
        user_team: req.body.user_team,
        user_aboutme: req.body.user_aboutme,
      });
      res.status(201).json(users);
    } catch (err) {
      console.error(err);
    }
  });
