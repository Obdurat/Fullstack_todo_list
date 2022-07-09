const bcrypt = require('bcrypt');

const verifyPassword = async (password, localPassword) => {
    const result = await bcrypt.compare(password, localPassword);
    return result;
};

module.exports = verifyPassword;