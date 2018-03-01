var db = require("../models");

module.exports = function (app) {

    app.get("/additem", authenticationMiddleware(), function (req, res) {

        db.Category.findAll({


        }).then(function (results) {
            console.log(results)

            let Category = {
                Category: results
            }
            res.render("item_add", Category)
        })




    })

    app.get("/api/items/:itemId?", function (req, res) {

        var query = {};
        if (req.params.itemId) {
            query = {
                id: req.params.itemId
            }
        }
 
 
        // db.Item.findAll({
        //     where: query,
        //     include: {
        //         model: db.User
        //     },
        //     include: {
        //         model: db.Category
        //     }
 
 
 
        // }).then(function (dbPost) {
        //     res.json(dbPost);
        // });
 
        db.Item.findAll({
            include:
            [{ all: true, nested: true }]
        }).then(function (dbPost) {
            res.json(dbPost);
        });
 
 
 
 
 
 
    })


    app.post("/api/items", function (req, res) {

        console.log(req);
        db.User.find({

            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            var currentUserId = results.id

            console.log(req.body.inputCategory)

            // db.Category.find({
            //     where:{
            //        Category: req.body.
            //     }
            // })

            db.Item.create({
                itemName: req.body.itemName,
                description: req.body.description,
                price: req.body.price,
                location: req.body.location,
                UserId: currentUserId,
                CategoryId: req.body.inputCategory

            }).then(function (results) {
                res.redirect("/items")
            });

        });
    });



    app.get("/items", function (req, res) {


        db.Item.findAll({
            include: [{
                model: db.User,
                model: db.Category
            }]
        }).then(function (dbPost) {
            console.log(dbPost.User);
            let itemData = {
                Item: dbPost
            }
            res.render("items", itemData);
        });


    })







};



function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`
        req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();

        res.redirect("/login")
    }
}