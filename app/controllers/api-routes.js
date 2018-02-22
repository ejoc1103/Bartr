var db = require("../models");

module.exports = function(app) {
    app.get("/register", function(req, res) {
        res.render("register", {title: "Registration"});
      });
    
    app.post("/registernew", function(req, res){
        db.User.create({
            userName: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then(function(results){
        res.json(results)   
        });
        res.render('register', {title: 'Registration Complete' }) 
    });
    }