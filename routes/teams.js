const express = require("express");
const User = require("../models/user");
const Teams = require("../models/teams");
const fs = require("fs");

const router = express.Router();

router
	// Read
	.get("/", async (req, res, next) => {
		try {
			// Teams 테이블 쿼리 후 teams 변수에 대입
			const teams = await Teams.findAll();
			// teams 테이블을 view 폴더의 teams.html에 연결
			res.render("teams", { teams });
		} catch (err) {
			console.error(err);
			next(err);
		}
	})
	// Create
	.post("/", async (req, res, next) => {
		try {
			const teams = await Teams.create({
				team_name: req.body.team_name,
				team_homeGround: req.body.team_homeGround,
				team_headCount: req.body.team_headCount,
				team_area: req.body.team_area,
			});
			res.redirect(req.originalUrl);
		} catch (err) {
			console.error(err);
		}
	});

router
	.route("/:team_name")
	// Update
	.patch(async (req, res, next) => {
		try {
		} catch (err) {}
	})
	// Delete
	.delete(async (req, res, next) => {
		try {
      
		} catch (err) {}
	});

module.exports = router;
