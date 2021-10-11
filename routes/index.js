const express = require("express");
const User = require("../models/users");
const fs = require("fs");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		// User 테이블 쿼리 후 user 변수에 대입
		const user = await User.findAll();
		// user 테이블을 view 폴더의 sequelize.html에 연결
		if (req.cookies.hasOwnProperty("user")) {
			res.render("main", { user, login: req.cookies.user.user_id });
		} else {
			res.render("main", { user });
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
