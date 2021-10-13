exports.logined = (req, res, next) => {
	// 로그인 검증
	const cookie = req.cookies.user;
	if (cookie == undefined) {
		// 로그인이 안돼있으면 아래 코드 실행
		res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
		res.write("<script>alert('로그인 후 이용해주세요!')</script>");
		res.write("<script>window.location='/user/login'</script>");
		res.end();
	} else {
		//
		res.locals.login = req.cookies.user.user_id;
		res.locals.teamName = req.cookies.user.user_team;
		next(); // 로그인이 돼있으면 다음 미들웨어로 넘어가
	}
};

exports.notLogined = async (req, res, next) => {
	// 로그인 검증
	const cookie = req.cookies.user;
	if (cookie == undefined) {
		next(); //  로그인이 안돼있으면 다음 미들웨어로 넘어가
	} else {
		// 로그인이 돼있으면 아래 코드 실행
		res.redirect("/");
	}
};

exports.teamCheck = async (req, res, next) => {
	const cookie = req.cookies.user;
	if (cookie != undefined) {
		res.locals.login = req.cookies.user.user_id;
		const team = req.cookies.user.user_team;
		if (team) {
			res.locals.teamName = team;
		}
	}
	next();
};
