exports.logined = (req, res, next) => {
  // 로그인 검증
  const cookie = req.cookies.user;
  if (cookie == undefined) {
    // 로그인이 안돼있으면 아래 코드 실행
    console.log("로그인 하세요!");
    res.redirect("/user/login");
  } else {
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
