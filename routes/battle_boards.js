const express = require("express");
const Battle_board = require("../models/battle_boards");
const formattedDate = require("../public/dateformat");
const router = express.Router();

// 게시판
router.route("/").get(async (req, res, next) => {
	try {
		const posts = await Battle_board.findAll();
		res.render("battle_board", {
			posts,
			date: formattedDate(posts, "battle_board_date"),
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
			res.render("battle_board_new");
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			await Battle_board.create({
				user_id: req.cookies.user.user_id,
				battle_board_title: req.body.battle_board_title,
				battle_board_content: req.body.battle_board_content,
				mercenary_select: req.body.mercenary_select,
			});
			res.redirect("/battle_board");
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

// 리스트 선택
router.route("/:battle_board_number").get(async (req, res, next) => {
	try {
		const post = await Battle_board.findAll({
			where: {
				battle_board_number: req.params.battle_board_number,
			},
		});

		res.render("mercenary_content", {
			post,
			date: formattedDate(post, "battle_board_date"),
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router
	.get("/:battle_board_number/edit", async (req, res, next) => {
		try {
			const post = await Battle_board.findAll({
				where: {
					battle_board_number: req.params.battle_board_number,
				},
			});
			res.render("mercenary_content_edit", { post });
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	.post("/:battle_board_number/edit", async (req, res, next) => {
		try {
			const updateContents = await Battle_board.update(
				{
					battle_board_title: req.body.battle_board_title,
					battle_board_content: req.body.battle_board_content,
				},
				{
					where: {
						battle_board_number: req.params.battle_board_number,
					},
				}
			);
			res.redirect(`/battle_board/${req.params.battle_board_number}`);
		} catch (err) {
			console.error(err);
			next(err);
		}
	});

// 게시글 삭제
router.route("/:battle_board_number/delete").get(async (req, res, next) => {
	try {
		const contentDelete = await Battle_board.destroy({
			where: {
				battle_board_number: req.params.battle_board_number,
			},
		});
		console.log(contentDelete);
		res.redirect("/battle_board");
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
