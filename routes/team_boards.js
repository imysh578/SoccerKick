const express = require("express");
const TeamBoards = require("../models/team_boards");
const { QueryTypes } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const posts = await TeamBoards.findAll();
		res.render("team_board", { posts });
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
				team_name: req.body.team_name,
				writer_name: req.body.writer_name,
				writer_id: req.body.writer_id,
				title: req.body.title,
				contents: req.body.contents,
			});
			res.redirect("/team_board");
		} catch (err) {
			console.error(err);
		}
	});

// 리스트 선택
router
	.route("/:post_num")
	.get(async (req, res, next) => {
		try {
			const team = await TeamBoards.findAll({
				where: {
					post_num: req.params.post_num,
				},
			});
			res.json(team);
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			console.log(req.body);
			await TeamBoards.update(
				{
					count_views: req.body.views,
				},
				{
					where: {
						post_num: req.params.post_num,
					},
				}
			);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

// 조회수 업데이트

module.exports = router;