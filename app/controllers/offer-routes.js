var db = require("../models");

module.exports = function(app) {
    
    app.post("/api/offers/:itemId", function (req, res) {

        let itemId = req.params.itemId
        
        console.log(req.body);
        
    db.Offers.create({
        userOffer: req.body.offerDescription,
        ItemId: itemId,
        UserId: 1 //need to be mapped to user session

    }).then(function (results) {
        res.json(results)
    });


});

};