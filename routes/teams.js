const express = require("express");
const Teams = require("../models/teams");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const formattedDate = require("../public/dateformat");

const router = express.Router();

// 구단 리스트 화면
router.route("/").get(async (req, res, next) => {
	try {
		// const teams = await sequelize.query("SELECT * FROM `teams`", {
		// 	type: QueryTypes.SELECT,
		// });
		const teams = await Teams.findAll();

		res.render("team", { teams });
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
			res.render("team_create");
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(upload.single("uploaded_file"), async (req, res, next) => {
		try {
			await Teams.create({
				team_name: req.body.team_name,
				team_leaderId: req.body.team_leaderId,
				team_homeGround: req.body.team_homeGround,
				team_manner: req.body.team_manner,
				team_headCount: req.body.team_headCount,
				team_area: req.body.team_area,
				team_info: req.body.team_info,
				logo_filename: req.file.filename,
			});

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
		res.render("team_detail", {
			team,
			date: formattedDate(team, "team_created_date"),
		});
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
			});
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(upload.single("uploaded_file"), async (req, res, next) => {
		try {
			console.log(Date.now());
			console.log(req.file);
			await Teams.update(
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
			console.log(req.body);
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
			const team = await Teams.findOne({
				attributes: ["logo_filename"],
				where: {
					team_name: req.params.team_name,
				},
			});
			const fileName = team.dataValues.logo_filename;
			const dir = path.join(__dirname, "../public/uploads");
			const fileDir = path.join(dir, "/" + fileName);
			console.log(fileDir);
			if (fileName) {
				fs.unlink(fileDir, async function (err) {
					try {
						console.log("*** Team logo file is deleted! ***");
					} catch (err) {
						console.error(err);
					}
				});
			}

			// 구단을 DB에서 삭제
			const res = await Teams.destroy({
				where: {
					team_name: req.params.team_name,
				},
			});
			res.redirect("/team");
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

module.exports = router;
