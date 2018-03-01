var db = require("../models");

module.exports = function (app) {

        app.get("/additem", authenticationMiddleware(), function (req, res) {

            db.Category.findAll({


            }).then(function (results) {

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
                include: [{
                    all: true,
                    nested: true
                }]
            }).then(function (dbPost) {
                res.json(dbPost);
            });






        })


        app.post("/api/items", function (req, res) {
                console.log(req.files)


                var file = req.files.uploaded_image;
                var img_name = file.name;

                if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

                    file.mv('/public/assets/img/item/' + file.name)
                    }


                    db.User.find({

                        where: {
                            userName: req.session.passport.user.userName
                        }
                    }).then(function (results) {
                        var currentUserId = results.id

                        db.Item.create({
                            itemName: req.body.itemName,
                            description: req.body.description,
                            price: req.body.price,
                            location: req.body.location,
                            UserId: currentUserId,
                            CategoryId: req.body.inputCategory,
                            imgSource: 'public/img/item/' + file.name

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
                    let itemData = {
                        Item: dbPost
                    }

                    console.log(itemData + "here data")
                    res.render("items", itemData);
                });

            })



            app.put("/api/items", function (req, res) {
                db.Item.update(
                    req.body, {
                        where: {
                            id: req.body.id
                        }
                    }).then(function (results) {
                    res.redirect("/items")
                })
            });



        };



        function authenticationMiddleware() {
            return (req, res, next) => {
                // console.log(`
                // req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
                if (req.isAuthenticated()) return next();

                res.redirect("/login")
            }
        }