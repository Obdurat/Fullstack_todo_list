const userModel = require('../../Database/models/user');
const { CustomError } = require('../../errors/customError');

const updateUser = async (credentials, body) => {
    const user = await userModel.findOne({ where: { id: credentials.id } });
    if (!user) throw new CustomError('Wrong Credentials', 400);
    user.update(body);
    return user;
};

module.exports = updateUser;