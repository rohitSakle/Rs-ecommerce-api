"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.profile, {
        foreignKey: "userId",
        as: "profile",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "customer", "seller", "guest"],
        defaultValue: "customer",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
    }
  );
  return user;
};
