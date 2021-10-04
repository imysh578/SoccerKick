const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.route("/edit").get(async (req, res, next) => {
    try {
        res.render("edit");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router
    .get("/edit/:user_id", async (req, res, next) => {
        try {
            const user = User.findAll({
                where: {
                    user_id: req.params.user_id,
                },
            });
            res.json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post("edit/:user_id", async (req, res, next) => {
        try {
            const user = await User.update(
                {
                    user_id: req.body.user_id,
                    user_password: req.body.user_password,
                    user_name: req.body.user_name,
                    user_age: req.body.user_age,
                    user_area: req.body.user_area,
                    user_gender: req.body.user_gender,
                    user_mail: req.body.user_mail,
                    user_position: req.body.user_position,
                    user_team: req.body.user_team,
                    user_aboutMe: req.body.user_aboutMe,
                    user_grade: req.body.user_grade,
                },
                {
                    where: req.params.user_id,
                }
            );
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;