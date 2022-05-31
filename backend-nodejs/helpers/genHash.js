const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

module.exports = generateHash;