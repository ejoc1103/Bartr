'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 15]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,100]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
      isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [2]
      }
    }
  });
    
  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return User;
};











