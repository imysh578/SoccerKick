const express = require("express");
const User = require("../models/users");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser("12345!@#$%"));

router.get("/", async (req, res, next) => {
  try {
    // User 테이블 쿼리 후 user 변수에 대입
    const user = await User.findAll();
    // user 테이블을 view 폴더의 sequelize.html에 연결
    let cookie = req.cookies.user;
    if (cookie === undefined) {
      // 디비에서 꺼내온 user값이랑 암호화된 user값을 비교하는건데 조건x
      // 쿠기값중에 uesr.user_id
      res.render("main");
      console.log("--------로그인 안하고");
    } else {
      res.render("main", { user, login: req.cookies.user.user_id });
      console.log("--------로그인 하고 id : " + req.cookies.user.user_id);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
