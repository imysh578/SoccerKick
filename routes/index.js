const express = require('express');
const User = require('../models/user');
const fs = require('fs');

const router = express.Router();

router.get('/', async(req,res,next)=>{
  try {
    const users = await User.findAll();
    // console.log(users);
    // res.render('sequelize',{users});
    // console.log(users);
    fs.readFile('../views/sequelize.html', (err, data)=>{
      console.log(data);
      // res.send(data.toString());
    })
    res.send('<h1> SoccerKick </h1>');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;