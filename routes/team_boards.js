const express = require("express");
const TeamBoards = require("../models/team_boards");
const { QueryTypes } = require("sequelize");
const formattedDate = require("../public/dateformat");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log(res.locals);
    const posts = await TeamBoards.findAll({
      where: {
        team_name: req.cookies.user.user_team,
      },
    });

    res.render("team_board", {
      posts,
      date: formattedDate(posts, "created_at"),
    });
    // if (!req.cookies.user.user_team == null) {
    // 	res.render("team_board", { posts });
    // } else {
    // 	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // 	res.write(
    // 		"<script>alert('소속 구단이 없습니다. 먼저 구단에 가입하세요')</script>"
    // 	);
    // 	res.write("<script>window.location='/team'</script>");
    // 	res.end();
    // }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 생성
router
  .route("/create")
  .get(async (req, res, next) => {
    try {
      console.log("create router");
      res.render("team_board_create");
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await TeamBoards.create({
        team_name: req.cookies.user.user_team,
        writer_name: req.cookies.user.user_name,
        writer_id: req.cookies.user.user_id,
        title: req.body.title,
        contents: req.body.contents,
      });
      res.redirect("/team_board");
    } catch (err) {
      console.error(err);
    }
  });

// 리스트 선택
router.route("/:post_num").get(async (req, res, next) => {
  try {
    const post = await TeamBoards.findAll({
      where: {
        post_num: req.params.post_num,
      },
    });
    const updateVeiwCount = await TeamBoards.update(
      {
        count_views: ++post[0].dataValues.count_views,
      },
      {
        attributes: ["count_views"],
        where: {
          post_num: req.params.post_num,
        },
      }
    );
    res.render("team_board_content", {
      post,
      date: formattedDate(post, "created_at"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .get("/:post_num/edit", async (req, res, next) => {
    try {
      console.log(1111);
      const post = await TeamBoards.findAll({
        where: {
          post_num: req.params.post_num,
        },
      });
      res.render("team_board_content_edit", { post });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:post_num/edit", async (req, res, next) => {
    try {
      const updateContents = await TeamBoards.update(
        {
          title: req.body.title,
          contents: req.body.contents,
        },
        {
          where: {
            post_num: req.params.post_num,
          },
        }
      );
      res.redirect(`/team_board/${req.params.post_num}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 게시글 삭제
router.route("/:post_num/delete").get(async (req, res, next) => {
  try {
    const contentDelete = await TeamBoards.destroy({
      where: {
        post_num: req.params.post_num,
      },
    });
    console.log(contentDelete);
    res.redirect("/team_board");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 조회수 업데이트

module.exports = router;
