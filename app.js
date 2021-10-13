require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const compression = require("compression");
const crypto = require("crypto");

const { sequelize, User } = require("./models");
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const teamsRouter = require("./routes/teams");
const teamBoardRouter = require("./routes/team_boards");
const teamCommentRouter = require("./routes/team_comments");
const mercenaryBoardRouter = require("./routes/mercenary_boards");
const battleBoardRouter = require("./routes/battle_boards");
const searchRouter = require("./routes/searchs");

const app = express();

const PORT = 3000;
// 기존 포트 넘버 없으면 3000으로 설정
app.set("port", process.env.PORT || PORT);
// nunjucks를 기본 엔진으로 설정
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  autoescape: true,
  watch: true,
});

sequelize
  // sync : MySQL에 테이블이 존재 하지 않을때 생성
  //      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
// 기본 파일 경로를 public으로 지정
app.use(express.static(path.join(__dirname, "/public")));
// express.json(): JSON으로 들어오는 요청 구문 분석(body-parser 기반)
// 구문 분석된 데이터는 req.body에 채워짐 (구문 분석할 본문이 없거나 Content-Type이 다르면 빈 객체 반환 또는 에러 발생)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//url을 통해 전달되는 데이터에 한글, 공백과 같은 문자가 포함될 경우 인식을 못하는 문제를 해결
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/team", teamsRouter);
app.use("/team_board", teamBoardRouter);
app.use("/team_comment", teamCommentRouter);
app.use("/mercenary_board", mercenaryBoardRouter);
// app.use('/mercenary_comment', mercenaryCommentRouter);
app.use("/battle_board", battleBoardRouter);
// app.use('/battle_comment', battleCommentRouter);
app.use("/search", searchRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.static || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port is ready");
});
