const express = require('express');
const User = require('../models/user');
const Teams = require('../models/teams');
const fs = require('fs');

const router = express.Router();

router.get('/teams', async(req,res,next)=>{
  try {
    // User 테이블 쿼리 후 user 변수에 대입
    const teams = await Teams.findAll();
    // user 테이블을 view 폴더의 sequelize.html에 연결
    res.render('teams',{teams});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
