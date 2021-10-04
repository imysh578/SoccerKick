const express = require("express");
const User = require("../models/user");
const Teams = require("../models/teams");
const fs = require("fs");
const Battle_board = require("../models/battle_board");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        // Teams 테이블 쿼리 후 teams 변수에 대입
        const battle_board = await Battle_board.findAll();
        // teams 테이블을 view 폴더의 teams.html에 연결
        res.render("battle_board", { battle_board });
    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
