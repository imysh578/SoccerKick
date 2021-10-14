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

// 로그인 시 필요한 데이터를 res.local.[변수명] = [값] 형태로 보내기
// 이 미들웨어는 '/'에서 불러오기 때문에 모든 페이지에서 다 사용 가능함
exports.loginDataParser = async (req, res, next) => {
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
