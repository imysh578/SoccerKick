const express = require("express");
const Teams = require("../models/teams");

const router = express.Router();

// 구단 리스트 화면
router
  .route("/")
  .get(async (req,res,next)=>{
    try {
      const teams = await Teams.findAll();
      res.render('teams', {teams});
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req,res,next)=>{
    try {
      console.log(req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 구단 선택 시
router
  .route("/:team_name")
  .get(async(req,res,next)=>{
    try {
      console.log(req.params)
      const team = await Teams.findAll({
        where: {
          team_name : req.params.team_name,
        }
      });
      res.json(team); 
    } catch (err) {
      console.error(err);
    }
  });

  

  module.exports = router;