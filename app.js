const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const mysql = require("mysql2");

const { sequelize } = require("./models");
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const teamsRouter = require("./routes/teams");
const mercenaryBoardRouter = require("./routes/mercenary_board");
const battleBoardRouter = require("./routes/battle_boards");

const app = express();

const PORT = 3000;
// 기존 포트 넘버 없으면 3000으로 설정
app.set("port", process.env.PORT || PORT);
// nunjucks를 기본 엔진으로 설정
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
// sync : 테이블이 존재 하지 않을때 생성 여부 결정
//      force: true   => 이미 테이블이 있으면 drop하고 다시 테이블 생성
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));
// express.json(): JSON으로 들어오는 요청 구문 분석(body-parser 기반)
// 구문 분석된 데이터는 req.body에 채워짐 (구문 분석할 본문이 없거나 Content-Type이 다르면 빈 객체 반환 또는 에러 발생)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/teams", teamsRouter);
// app.use('/team_board', teamBoardRouter);
// app.use('/team_comment', teamCommentRouter);
app.use("/mercenary_board", mercenaryBoardRouter);
// app.use('/mercenary_comment', mercenaryCommentRouter);
app.use("/battle_board", battleBoardRouter);
// app.use('/battle_comment', battleCommentRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.static || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port is ready");
});
