const express = require("express");

const fs = require("fs");
const Battle_board = require("../models/battle_board");

const router = express.Router();

router
    .get("/", async (req, res, next) => {
        //배틀보드 리스트 화면
        try {
            // Teams 테이블 쿼리 후 teams 변수에 대입
            const battle_board = await Battle_board.findAll();
            // teams 테이블을 view 폴더의 teams.html에 연결
            res.render("battle_board", { battle_board });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post("/", async (req, res, next) => {
        //배틀보드 글쓰기
        try {
            console.log(req.body);
            const battle_board = await Battle_board.create({
                battle_board_teamName: req.body.battle_board_teamName,
                battle_board_area: req.body.battle_board_area,
                battle_board_id: req.body.battle_board_id,
                battle_board_personnel: req.body.battle_board_personnel,
                battle_board_title: req.body.battle_board_title,
                battle_board_content: req.body.battle_board_content,
                battle_board_date: req.body.battle_board_date,
            });
            res.status(201).json(battle_board); //제이슨으로 확인.
        } catch (err) {
            console.error(err);
        }
    });
//배틀보드 클릭시 정보
router.route("/:battle_board_teamName").get(async (req, res, next) => {
    try {
        const battle_board = await Battle_board.findAll({
            where: {
                battle_board_teamName: req.params.battle_board_teamName,
            },
        });
        res.json(battle_board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;
