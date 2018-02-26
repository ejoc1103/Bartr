'use strict';
module.exports = (sequelize, DataTypes) => {
  var Offers = sequelize.define('Offers', {
    offer: DataTypes.STRING,
    offerName: DataTypes.STRING
  });


Offers.associate = function(models) {

    Offers.belongsTo(models.Item, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Offers;
};