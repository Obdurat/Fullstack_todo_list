"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Task.init({
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    }, { sequelize, modelName: "Task" }
  );
  return Task;
};
