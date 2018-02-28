'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 15]
      }
    }
  });
    
//   User.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     User.hasMany(models.Item, {
//       onDelete: "cascade"
//     });
//     User.hasMany(models.Offers, {
//       onDelete: "cascade"
//     });
//   };

  return Category;
};
