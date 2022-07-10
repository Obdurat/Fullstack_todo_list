const { CustomError } = require('../../errors/customError');
const verifyPassword = require('../../helpers/verifyPass');
const Models = require('../../Database/models');

const login = async (body) => {
    const { email, password } = body;
    const user = await Models.User.findOne({ where: { email: email }});
    if (!user) throw new CustomError('Wrong Credentials', 400);
    const check = await verifyPassword(`${password}`, `${user.password}`);
    if (!check) throw new CustomError('Wrong Credentials', 400);
    return user;
}

module.exports = login;