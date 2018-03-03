var db = require("../models");

module.exports = function (app) {

    app.post("/api/offers/:itemId", function (req, res) {
        var fileThing = ""
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    if (req.files.uploaded_offer) {
        let sampleFile = req.files.uploaded_offer;

        fileThing = '/assets/img/offers/' +  req.session.passport.user.userName + sampleFile.name

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('./public/assets/img/offers/' +  req.session.passport.user.userName + sampleFile.name)
    } else {
        res.render('/items')
    }

    
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