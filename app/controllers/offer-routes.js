var db = require("../models");

module.exports = function (app) {

    app.post("/api/offers/:itemId", function (req, res) {
            var fileThing = ""
            console.log(req.files)
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        // if (req.files.uploaded_offer) {
        //     let sampleFile = req.files.uploaded_offer;

        //     fileThing = '/assets/img/offers/' + req.body.username + sampleFile.name

        //     // Use the mv() method to place the file somewhere on your server
        //     sampleFile.mv('./public/assets/img/offers/' + req.body.username + sampleFile.name)
        // } else {
        //     fileThing ='/assets/img/offers/defaultoffer.png'
        // }

        
        let itemId = req.params.itemId


        db.User.find({

            where: {
                userName: req.session.passport.user.userName
            }
        }).then(function (results) {
            var currentUserId = results.id

            db.Offers.create({
                userOffer: req.body.offerDescription,
                ItemId: itemId,
                UserId: currentUserId,
                imgSource: fileThing

            }).then(function (results) {
                res.redirect("/profile")
            });

        });
    });
}