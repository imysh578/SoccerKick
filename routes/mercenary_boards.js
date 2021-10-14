const express = require("express");
const Mercenary_board = require("../models/mercenary_boards");
const { QueryTypes } = require("sequelize");
const formattedDate = require("../public/dateformat");
const router = express.Router();

// 게시판
router.route("/").get(async (req, res, next) => {
  try {
    const posts = await Mercenary_board.findAll();
    res.render("mercenary_board", {
      posts,
      date: formattedDate(posts, "mercenary_board_date"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 용병게시판 새 글쓰기
router
  .route("/new")
  .get(async (req, res, next) => {
    try {
      console.log(1111111111111111111111);
      res.render("mercenary_board_new");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await Mercenary_board.create({
        user_id: req.cookies.user.user_id,
        mercenary_board_title: req.body.mercenary_board_title,
        mercenary_board_content: req.body.mercenary_board_content,
        mercenary_select: req.body.mercenary_select,
      });
      res.redirect("/mercenary_board");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 리스트 선택
router.route("/:mercenary_board_number").get(async (req, res, next) => {
  try {
    const post = await Mercenary_board.findAll({
      where: {
        mercenary_board_number: req.params.mercenary_board_number,
      },
    });

    res.render("mercenary_content", {
      post,
      date: formattedDate(post, "mercenary_board_date"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .get("/:mercenary_board_number/edit", async (req, res, next) => {
    try {
      const post = await Mercenary_board.findAll({
        where: {
          mercenary_board_number: req.params.mercenary_board_number,
        },
      });
      res.render("mercenary_content_edit", { post });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:mercenary_board_number/edit", async (req, res, next) => {
    try {
      const updateContents = await Mercenary_board.update(
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
      res.redirect(`/mercenary_board/${req.params.mercenary_board_number}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 게시글 삭제
router.route("/:mercenary_board_number/delete").get(async (req, res, next) => {
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

module.exports = router;
