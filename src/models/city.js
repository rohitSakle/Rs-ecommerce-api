"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.state, {
        foreignKey: "stateId",
        as: "state",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.profile, {
        foreignKey: "cityId",
        as: "profiles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  city.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "states",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      modelName: "city",
      paranoid: true,
    }
  );
  return city;
};
