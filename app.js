const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const mysql = require("mysql2");

const { sequelize } = require("./models");
// const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const editRotuer = require("./routes/edits");

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
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", indexRouter);
app.use("/", usersRouter);
// app.use("/", editRotuer);
// app.use('/teams', teamsRouter);
// app.use('/team_board', teamBoardRouter);
// app.use('/team_comment', teamCommentRouter);
// app.use('/mercenary_board', mercenaryBoardRouter);
// app.use('/mercenary_comment', mercenaryCommentRouter);
// app.use('/battle_board', battleBoardRouter);
// app.use('/battle_comment', battleCommentRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "soccer" ? err : {};
  res.status(err.static || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port is ready");
});
