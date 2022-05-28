const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const taskModel = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9_.-]*$/
        }
    }
});

taskModel.sync();

module.exports = taskModel