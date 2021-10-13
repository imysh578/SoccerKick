const express = require("express");
const Mercenary_board = require("../models/mercenary_boards");
const formattedDate = require("../public/dateformat");
const router = express.Router();

// 게시판
router.route("/").get(async (req, res, next) => {
  try {
    const mercenary_board = await Mercenary_board.findAll();
    res.render("mercenary_board", {
      mercenary_board,
      date: formattedDate(mercenary_board, "mercenary_board_date"),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 글 선택시
router.route("/content/:mercenary_board_number").get(async (req, res, next) => {
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
  .route("/new")
  .get(async (req, res, next) => {
    try {
      res.render("mercenary_board_new");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const create = await Mercenary_board.create({
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

router.post("/content/:mercenary_board_number", async (req, res, next) => {
  try {
    const DELETE = await Mercenary_board.destroy({
      where: {
        mercenary_board_number: req.cookies.user.mercenary_board_number,
      },
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
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

// // 구단 관리
// router
//   .get("/edit/:team_name", async (req,res,next)=>{
//     try {
//       const teams = await Teams.findAll({
//         where: {
//           team_name : req.params.team_name,
//         }
//       });
//       res.render('team_edit', {teams});
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })
//   .post("/edit/:team_name", async(req,res,next)=>{
//     try {
//       const teams = await Teams.update(
//         {
//         // team_name: req.body.team_name,
// 				// team_homeGround: req.body.team_homeGround,
// 				team_headCount: req.body.team_headCount,
// 				// team_manner: req.body.team_manner,
// 				// team_area: req.body.team_area,
// 				// team_leaderId: req.body.team_leaderId,
// 				// team_info: req.body.team_info,
//       },
//       {
//         where: {team_name: req.params.team_name}
//       }
//       )
//       res.redirect('/teams');
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   })

// 구단 선택 시
// router.route("/:number").get(async (req, res, next) => {
//   try {
//     const Mercenary_boardNUMBER = await Mercenary_board.findAll({
//       where: {
//         number: req.params.number,
//       },
//     });
//     res.json(Mercenary_boardNUMBER);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
