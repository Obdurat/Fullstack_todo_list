const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const userModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9_.-]*$/
        }
    },
    lastName: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }   
});

userModel.sync();

module.exports = userModel