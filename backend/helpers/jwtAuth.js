const jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/customError");

const verifyToken = (token, next) => {
  try {
    const credentials = jwt.verify(token, process.env.JWT_SECRET);
    return credentials;
  } catch (error) {
    return next(CustomError("Wrong Credentials", 401));
  }
};

module.exports = verifyToken;
