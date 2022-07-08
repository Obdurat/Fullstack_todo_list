const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hash(password, 10);
};

module.exports = generateHash;