const express = require("express");
const User = require("../models/users");
const fs = require("fs");
const cookieParser = require("cookie-parser");

const router = express.Router("12345!@#$%");
// router.use(cookieParser("12345!@#$%"));

router.get("/", async (req, res, next) => {
	try {
		console.log(req.signedCookies);
		console.log(req.cookies);
		// User 테이블 쿼리 후 user 변수에 대입
		const user = await User.findAll();
		// user 테이블을 view 폴더의 sequelize.html에 연결
		let cookie = req.cookies.user;
		if (cookie === undefined) {
			res.render("main");
		} else {
			res.render("main", { user, login: req.cookies.user.user_id });
			console.log("--------로그인 하고 id : " + req.cookies.user.user_id);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
