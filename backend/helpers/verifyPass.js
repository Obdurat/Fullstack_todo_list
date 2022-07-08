const bcrypt = require('bcrypt');

const verifyPassword = async (password, localPassword) => {
    console.log(password, localPassword);
    if (!localPassword) return 'oi';
    const result = await bcrypt.compare(password, localPassword);
    console.log(result);
    return result;
};

module.exports = verifyPassword;