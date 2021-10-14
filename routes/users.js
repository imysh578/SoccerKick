const express = require("express");
const User = require("../models/users");
const session = require("express-session");
const cookieParser = require("cookie-parser"); //
const { logined, notLogined } = require("../public/loginCheck");

const router = express.Router();
router.use(cookieParser("12345!@#$%"));
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
      const userCreated = await User.findOne({
        where: { user_id: req.body.user_id },
      });
      if (!userCreated) {
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
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('회원가입 완료')</script>");
        res.write("<script>window.location='/user/login'</script>");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('이미 존재하는 아이디')</script>");
        res.write("<script>window.location='/user/login'</script>");
      }
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
          maxAge: 60 * 60 * 1000 * 24,
          httpOnly: true, //
          path: "/",
        });
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인 성공')</script>");
        res.write("<script>window.location='/'</script>");
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

//비밀번호 찾기
router
  .get("/findPWD", (req, res) => {
    res.render("findPWD");
  })
  .post("/findPWD", async (req, res, next) => {
    const user = await User.findOne({
      where: {
        user_mail: req.body.user_mail,
      },
    });
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('메일발송 되었습니다')</script>");
  });

// 마이페이지
router
  .get("/myPage", logined, async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: { user_id: req.cookies.user.user_id },
      });
      res.render("myPage", { user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:user_id", async (req, res, next) => {
    //회원탈퇴
    try {
      const user = await User.destroy({
        where: { user_id: req.cookies.user.user_id },
      });
      res.clearCookie("user", user);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<script>alert('탈퇴 되었습니다')</script>");
      res.write("<script>alert('퉤')</script>");
      res.write("<script>window.location='/'</script>");
      // res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  });

router.get("/logout", (req, res) => {
  const user = User.findAll({
    where: { user_id: req.cookies.user.user_id },
  });
  res.clearCookie("user", user);
  res.redirect("/");
});

//회원 정보 수정
router
  .get("/edit/:user_id", logined, async (req, res, next) => {
    try {
      const user = await User.findAll({
        where: {
          user_id: req.cookies.user.user_id,
        },
      });
      res.render("edit", { user });
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
      res.clearCookie("user", user);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(
        "<script>alert('수정되었습니다. 다시 로그인해주세요')</script>"
      );
      res.write("<script>window.location='/user/login'</script>");
    } catch (err) {
      console.error(err);
      next(err);
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
