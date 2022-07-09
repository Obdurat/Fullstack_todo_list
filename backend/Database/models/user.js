const { sequelize } = require("../connect");
const { DataTypes } = require("sequelize");
const { CustomError } = require("../../errors/customError");

const URLREGEXP =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkFirstName(value) {
        if (!value) throw new CustomError("First name is required", 400);
        if (!value.match(/[a-zA-Z]/))
          throw new CustomError("Only letters are allowed as First Name", 400);
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkLastName(value) {
        if (!value) throw new CustomError("Last name is required", 400);
        if (value.match(/[\W]/g))
          throw new CustomError("Only letters are allowed as Last Name", 400);
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      checkEmail(value) {
        if (!value) throw CustomError("Email is required", 400);
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
          throw new CustomError("Invalid Email", 400);
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatar: {
    type: DataTypes.CHAR,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = userModel;
