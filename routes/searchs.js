const express = require("express");
const Teams = require("../models/teams");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const router = express.Router();

router
.route("/:team_name")   //post방식으로받는중;
.get(async (req,res,next)=>{
    console.log(req.body.q)
    try {
        const team = await Teams.findAll({
                where:{
                team_name: req.params.team_name,
            },
        });
        res.json(team);
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;
