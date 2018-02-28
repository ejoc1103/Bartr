var db = require("../models");

module.exports = function (app) {

    app.get("/api/category/:category?", function (req, res) {

        // let category ={}
        // if(req.params.catergory){
        // category = req.params.category
        // }

        console.log(req.body);

        db.Category.findAll({

            where: {

            }
        }).then(function (results) {
            res.json(results)
        });

    });










};