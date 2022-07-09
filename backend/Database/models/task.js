const { sequelize } = require("../connect");
const { DataTypes } = require("sequelize");
const userModel = require("./user");

const taskModel = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[ a-zA-Z0-9_.-]*$/,
    },
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

taskModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  type: DataTypes.UUID,
});
userModel.hasMany(taskModel);

module.exports = taskModel;
