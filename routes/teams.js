const express = require("express");
const Teams = require("../models/teams");
const Users = require("../models/users");
const WannaJoin = require("../models/wanna_joins");
const UsersInTeam = require("../models/usersInTeam");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const { QueryTypes } = require("sequelize");
const { sequelize, User } = require("../models");
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
].sort();

// 구단 리스트 화면
router.route("/").get(async (req, res, next) => {
	try {
		const teams = await Teams.findAll({
			include: {
				model: UsersInTeam,
			},
			order: [["team_created_date", "DESC"]],
		});
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
			res.render("team_create", { area: area_options });
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(upload.single("uploaded_file"), async (req, res, next) => {
		try {
			// 구단 테이블 생성
			const teams = await Teams.create({
				team_name: req.body.team_name,
				team_leaderId: req.cookies.user.user_id,
				team_homeGround: req.body.team_homeGround,
				team_manner: req.body.team_manner,
				team_area: req.body.team_area,
				team_info: req.body.team_info,
			});
			// 유저-구단 관계 테이블 생성
			const usersInTeam = await UsersInTeam.create({
				user_id: req.cookies.user.user_id,
				team_name: req.body.team_name,
			});
			// 업로드 파일이 있으면 업로드 파일 이름도 테이블에 추가
			if (req.file) {
				const updateTeam = await Teams.update(
					{
						logo_filename: req.file.filename,
					},
					{ where: { team_leaderId: req.cookies.user.user_id } }
				);
			}
			// 변경 사항을 유저 테이블에도 적용
			const updateUser = await Users.update(
				{
					user_team: req.body.team_name,
				},
				{
					where: { user_id: req.cookies.user.user_id },
				}
			);
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
			include: {
				model: UsersInTeam,
				where: {
					team_name: req.params.team_name,
				},
			},
		});
		// console.log(team[0].dataValues);
		const wannaJoin = await WannaJoin.findOne({
			where: {
				user_id: req.cookies.user.user_id,
			},
		});
		res.render("team_detail", {
			team,
			date: formattedDate(team, "team_created_date"),
			wannaJoin: wannaJoin,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// 가입신청
router
	.get("/detail/:team_name/join", async (req, res, next) => {
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
	})
	.get("/detail/:team_name/join/:user_id/cancel", async (req, res, next) => {
		try {
			// 가입 승인 요청 지우기
			const wannaJoinDelete = WannaJoin.destroy({
				where: { user_id: req.params.user_id },
			});

			res.redirect(`/team`);
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
			});
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(upload.single("uploaded_file"), async (req, res, next) => {
		try {
			// 구단 테이블 수정
			const updateTeam = await Teams.update(
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
			// 유저-구단 테이블 수정
			const updateUsersinTeam = await UsersInTeam.update(
				{
					team_name: req.body.team_name,
				},
				{
					where: { team_name: req.params.team_name },
				}
			);
			// 업로드 파일 선택했으면
			if (req.file) {
				// 이전 구단의 로고 파일 삭제
				deleteTeamLogo(req.params.team_name);
				// 로고 파일 이름도 수정
				const team = await Teams.update(
					{ logo_filename: req.file.filename },
					{ where: { team_name: req.params.team_name } }
				);
			}
			// 유저 테이블 수정
			const updateUser = await Users.update(
				{ user_team: req.body.team_name },
				{ where: { user_team: req.params.team_name } }
			);
			res.redirect(`/team/detail/${req.body.team_name}`);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

// 구단 삭제
router.route("/detail/:team_name/edit/delete").get(async (req, res, next) => {
	try {
		// 삭제하려는 구단의 로고 파일도 같이 삭제
		const deleteFile = await deleteTeamLogo(req.params.team_name);

		// 구단 테이블에서 삭제
		const team = await Teams.destroy({
			where: {
				team_name: req.params.team_name,
			},
		});

		// 유저-구단 테이블에서 삭제

		// 유저 테이블에서 null로 입력
		const user = await Users.update(
			{
				user_team: null,
			},
			{
				where: { user_team: req.params.team_name },
			}
		);
		res.redirect("/team");
	} catch (err) {
		console.error(err);
		next(err);
	}
});

// 내 소속 구단
router.route("/myTeam/:team_name").get(async (req, res, next) => {
	try {
		const users = await Users.findAll({
			where: {
				user_team: req.cookies.user.user_team,
			},
		});
		res.render("myTeam", { users });
	} catch (err) {
		console.error(err);
	}
});

// 가입 신청 목록
router
	.get("/myTeam/:team_name/wannaJoin", async (req, res, next) => {
		try {
			const wannaJoin = await WannaJoin.findAll({
				include: { model: User },
				where: {
					team_name: req.params.team_name,
				},
			});
			res.render("wannaJoin", { wannaJoin });
		} catch (err) {
			console.error(err);
		}
	})
	.get(
		"/myTeam/:team_name/wannaJoin/:user_id/approved",
		async (req, res, next) => {
			try {
				// 구단 가입 승인 => 유저 테이블에 구단명 기입
				const userUpdate = Users.update(
					{ user_team: req.params.team_name },
					{ where: { user_id: req.params.user_id } }
				);
				// 가입 승인 요청 항목 지우기
				const wannaJoinDelete = WannaJoin.destroy({
					where: { user_id: req.params.user_id },
				});
				// 유저-구단 테이블에 생성
				const usersInTeam = UsersInTeam.create({
					team_name: req.params.team_name,
					user_id: req.params.user_id,
				});

				res.redirect(`/team/myTeam/${req.params.team_name}/wannaJoin`);
			} catch (err) {
				console.error(err);
				next(err);
			}
		}
	)
	.get(
		"/myTeam/:team_name/wannaJoin/:user_id/removed",
		async (req, res, next) => {
			try {
				// 가입 승인 요청 지우기
				const wannaJoinDelete = WannaJoin.destroy({
					where: { user_id: req.params.user_id },
				});

				res.redirect(`/team/myTeam/${req.params.team_name}/wannaJoin`);
			} catch (err) {
				console.error(err);
				next(err);
			}
		}
	);

module.exports = router;
