const express = require('express');
const fs = require('fs');

const router = express.Router();

router
    .get("/", (req,res,next)=>{
        res.send('**')
        });
    module.exports = router;