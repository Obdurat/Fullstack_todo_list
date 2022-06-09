const { sequelize } = require('../connect');
const { DataTypes, Model } = require('sequelize');
const generateHash = require('../../helpers/genHash');

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
            notEmpty: true,           
            is: /^[a-zA-Z]*$/
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,        
        validate: {
            notEmpty: true,
            is: /^[a-zA-Z]*$/
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,        
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    avatar: {
        type: DataTypes.CHAR,
        allowNull: true,
        unique: true,
        validate: {
            isUrl: true,
        }
    },
});

userModel.beforeSave(async (user) => {
    const hashPass = await generateHash(user.password);
    user.password = hashPass;
});

userModel.sync();

module.exports = userModel