const userModel = require('../../Database/models/user');
const { CustomError } = require('../../errors/customError');
const verifyPassword = require('../../helpers/verifyPass');

const login = async (body) => {
    const { email, password } = body;
    const user = await userModel.findOne({ where: { email: email }});
    if (!user) throw new CustomError('Wrong Credentials', 400);
    const check = await verifyPassword(`${password}`, `${user.password}`);
    if (!check) throw new CustomError('Wrong Credentials', 400);
    return user;
}

module.exports = login;