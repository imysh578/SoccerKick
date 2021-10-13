const express = require("express");
const Teams = require("../models/teams");
const Users = require("../models/users");
const WannaJoin = require("../models/wanna_joins");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const formattedDate = require("../public/dateformat");
const deleteTeamLogo = require("../public/deleteTeamLogo");

const router = express.Router();
const area_options = [
  "도봉구",
  "노원구",
  "강북구",
  "성북구",
  "동대문구",
  "중랑구",
  "성동구",
  "광진구",
  "중구",
  "종로구",
  "용산구",
  "은평구",
  "서대문구",
  "마포구",
  "강서구",
  "양천구",
  "영등포구",
  "구로구",
  "동작구",
  "금천구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];

// 구단 리스트 화면
router.route("/").get(async (req, res, next) => {
  try {
    // const teams = await sequelize.query("SELECT * FROM `teams`", {
    // 	type: QueryTypes.SELECT,
    // });
    const teams = await Teams.findAll();
    const users = await Users.findAll();
    res.render("team", { teams, login: req.cookies.user.user_id });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 구단 생성
router
  .route("/create")
  .get(async (req, res, next) => {
    try {
      // uploads 폴더가 없으면 public/uploads 경로에 새폴더 생성
      const dir = path.join(__dirname, "../public/uploads");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      res.render("team_create", {
        login: req.cookies.user.user_id,
        area: area_options,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(upload.single("uploaded_file"), async (req, res, next) => {
    try {
      if (req.file) {
        const teams = await Teams.create({
          team_name: req.body.team_name,
          team_leaderId: req.cookies.user.user_id,
          team_homeGround: req.body.team_homeGround,
          team_manner: req.body.team_manner,
          team_area: req.body.team_area,
          team_info: req.body.team_info,
          logo_filename: req.file.filename,
        });
      } else {
        const teams = await Teams.create({
          team_name: req.body.team_name,
          team_leaderId: req.cookies.user.user_id,
          team_homeGround: req.body.team_homeGround,
          team_manner: req.body.team_manner,
          team_area: req.body.team_area,
          team_info: req.body.team_info,
        });
      }

      res.redirect("/team");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 구단 상세 정보 페이지
router.route("/detail/:team_name").get(async (req, res, next) => {
  try {
    const team = await Teams.findAll({
      where: {
        team_name: req.params.team_name,
      },
    });
    const wannaJoin = await WannaJoin.findOne({
      where: {
        team_name: req.params.team_name,
        user_id: req.cookies.user.user_id,
      },
    });
    res.render("team_detail", {
      team,
      date: formattedDate(team, "team_created_date"),
      login: req.cookies.user.user_id,
      wannaJoin: wannaJoin,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 가입신청
router.route("/detail/:team_name/join").get(async (req, res, next) => {
  try {
    const team = await Teams.findOne({
      attributes: ["team_name", "team_leaderId"],
      where: {
        team_name: req.params.team_name,
      },
    });
    const user = await Users.findOne({
      attributes: ["user_id"],
      where: {
        user_id: req.cookies.user.user_id,
      },
    });
    const wannaJoin = await WannaJoin.create({
      team_name: team.dataValues.team_name,
      team_leaderId: team.dataValues.team_leaderId,
      user_id: user.dataValues.user_id,
    });
    res.redirect("/team");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 구단 정보 수정
router
  .route("/detail/:team_name/edit")
  .get(async (req, res, next) => {
    try {
      const team = await Teams.findAll({
        where: {
          team_name: req.params.team_name,
        },
      });

      res.render("team_edit", {
        team,
        date: formattedDate(team, "team_created_date"),
        area: area_options,
        login: req.cookies.user.user_id,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(upload.single("uploaded_file"), async (req, res, next) => {
    try {
      if (req.file === undefined) {
        const team = await Teams.update(
          {
            team_name: req.body.team_name,
            team_homeGround: req.body.team_homeGround,
            team_headCount: req.body.team_headCount,
            team_manner: req.body.team_manner,
            team_area: req.body.team_area,
            team_leaderId: req.body.team_leaderId,
            team_info: req.body.team_info,
          },
          {
            where: { team_name: req.params.team_name },
          }
        );
      } else {
        // 이전 구단의 로고 파일 삭제
        deleteTeamLogo(req.params.team_name);

        const team = await Teams.update(
          {
            team_name: req.body.team_name,
            team_homeGround: req.body.team_homeGround,
            team_headCount: req.body.team_headCount,
            team_manner: req.body.team_manner,
            team_area: req.body.team_area,
            team_leaderId: req.body.team_leaderId,
            team_info: req.body.team_info,
            logo_filename: req.file.filename,
          },
          {
            where: { team_name: req.params.team_name },
          }
        );
      }
      res.redirect(`/team/detail/${req.body.team_name}`);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 구단 삭제
router
  .route("/detail/:team_name/edit/delete")
  .delete(async (req, res, next) => {
    try {
      // 삭제하려는 구단의 로고 파일도 같이 삭제
      const deleteFile = await deleteTeamLogo(req.params.team_name);

      // 구단을 DB에서 삭제
      const team = await Teams.destroy({
        where: {
          team_name: req.params.team_name,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
