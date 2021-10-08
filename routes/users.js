const express = require("express");
const User = require("../models/users");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const router = express.Router();

let sess;
//회원 가입
router
  .get("/", async (req, res, next) => {
    try {
      const user = await User.findAll();

      res.render("user", { user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      const user = await User.create({
        user_id: req.body.user_id,
        user_password: req.body.user_password,
        user_name: req.body.user_name,
        user_age: req.body.user_age,
        user_area: req.body.user_area,
        user_gender: req.body.user_gender,
        user_mail: req.body.user_mail,
        user_position: req.body.user_position,
        user_team: req.body.user_team,
        user_aboutMe: req.body.user_aboutMe,
        user_grade: req.body.user_grade,
      });

      res.redirect("/user");

      // res.status(201).json(user);
    } catch (err) {
      console.error(err);
    }
  });

//로그인 라우터
router
  .get("/login", function (req, res) {
    res.render("login");
  })
  .post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          user_id: req.body.user_id,
          user_password: req.body.user_password,
        },
      });
      if (!user) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(
          "<script>alert('아이디 또는 비밀번호를 확인해주세요')</script>"
        );
        res.write("<script>window.location='/user/login'</script>");
      } else {
        res.cookie("user", user, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          path: "/",
        });
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인 성공')</script>");
        res.write("<script>window.location='/'</script>");
        // console.log(req.cookies);
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 마이페이지
router.get("/myPage", async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { user_id: req.cookies.user.user_id },
    });
    if (req.cookies.hasOwnProperty("user")) {
      res.render("myPage", { user, login: req.cookies.user.user_id });
    } else {
      res.render("myPage");
    }
    // res.render("myPage", { user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//회원 정보 수정
router
  .get("/edit/:user_id", async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: {
          user_id: req.cookies.user.user_id,
        },
      });
      if (req.cookies.hasOwnProperty("user")) {
        res.render("edit", { user, login: req.cookies.user.user_id });
      } else {
        res.render("edit");
      }
      // res.render("edit", { user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/edit/:user_id", async (req, res, next) => {
    try {
      const user = await User.update(
        {
          user_id: req.body.user_id,
          user_password: req.body.user_password,
          user_name: req.body.user_name,
          user_age: req.body.user_age,
          user_area: req.body.user_area,
          user_gender: req.body.user_gender,
          user_mail: req.body.user_mail,
          user_position: req.body.user_position,
          user_team: req.body.user_team,
          user_aboutMe: req.body.user_aboutMe,
          user_grade: req.body.user_grade,
        },
        {
          where: { user_id: req.cookies.user.user_id },
        }
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete("/:user_id", async (req, res, next) => {
    try {
      const user = await User.destroy({
        where: { user_id: req.params.user_id },
      });
      res.redirect();
    } catch (err) {
      console.error(err);
    }
  });

router.get("/:user_id", async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
