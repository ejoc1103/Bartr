var db = require("../models");

module.exports = function(app) {
    
    app.post("/api/offers", function (req, res) {
        console.log(id)

    db.Offers.create({
        offer: req.body.offerDescription,
        ItemId: 1, //need to be mapped to user session
    }).then(function (results) {
        res.json(results)
    });


});

};