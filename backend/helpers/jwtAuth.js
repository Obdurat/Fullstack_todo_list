const jwt = require('jsonwebtoken');
const { newErrorCreator } = require('../errors/customError');

const verifyToken = (token, next) => {
    try {
        const credentials = jwt.verify(token, process.env.JWT_SECRET);
        return credentials;
    } catch (error) {
        next(newErrorCreator('Wrong Credentials', 401));
    }
}

module.exports = verifyToken;