const bcrypt = require('bcrypt');

const verifyPassword = (password, localPassword) => {
    if (!localPassword) return false;
    return bcrypt.compareSync(password, localPassword);
};

module.exports = verifyPassword;