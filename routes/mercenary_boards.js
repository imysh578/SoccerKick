const express = require("express");
const Mercenary_board = require("../models/mercenary_boards");
const { QueryTypes } = require("sequelize");
const formattedDate = require("../public/dateformat");
const router = express.Router();

// 게시판
router.route("/").get(async (req, res, next) => {
  try {
    const post = await Mercenary_board.findAll();
    console.log("용병게시판");
    res.render("mercenary_board", {
      post,
      date: formattedDate(post, "mercenary_board_date"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 글 선택시
router.route("/:mercenary_board_number").get(async (req, res, next) => {
  try {
    const info = await Mercenary_board.findAll({
      where: {
        mercenary_board_number: req.params.mercenary_board_number,
      },
    });
    res.render("mercenary_content", {
      info,
      date: formattedDate(info, "mercenary_board_date"),
    });
  } catch (err) {}
});

// 용병게시판 새 글쓰기
router
  .route("/asdf")
  .get(async (req, res, next) => {
    try {
      console.log(1111111111111111111111);
      // res.render("mercenary_board_new");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await Mercenary_board.create({
        team_name: req.cookies.user.user_team,
        writer_name: req.cookies.user.user_name,
        writer_id: req.cookies.user.user_id,
        title: req.body.mercenary_board_title,
        contents: req.body.mercenary_board_content,

        mercenary_board_title: req.body.mercenary_board_title,
        mercenary_board_content: req.body.mercenary_board_content,
        mercenary_select: req.body.mercenary_select,

        user_id: req.body.user_id,
        user_area: req.body.user_area,
        user_position: req.body.user_position,
      });
      res.redirect("/mercenary_board");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 게시글 삭제
router.route("/:post_num/delete").get(async (req, res, next) => {
  try {
    const contentDelete = await Mercenary_board.destroy({
      where: {
        mercenary_board_number: req.params.mercenary_board_number,
      },
    });
    console.log(contentDelete);
    res.redirect("/mercenary_board");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  // .route("/content/:mercenary_board_number/edit")
  .get("/content/:mercenary_board_number/edit", async (req, res, next) => {
    try {
      const info = await Mercenary_board.findAll({
        where: {
          mercenary_board_number: req.params.mercenary_board_number,
        },
      });
      res.render("mercenary_content_edit", { info });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/content/:mercenary_board_number", async (req, res, next) => {
    try {
      const changeContent = await Mercenary_board.update(
        {
          mercenary_board_title: req.body.mercenary_board_title,
          mercenary_board_content: req.body.mercenary_board_content,
        },
        {
          where: {
            mercenary_board_number: req.params.mercenary_board_number,
          },
        }
      );
      res.redirect("/content/:mercenary_board_number");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
module.exports = router;
