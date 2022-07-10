const Models = require("../../Database/models/");
const { CustomError } = require('../../errors/customError');

const updateUser = async (credentials, body) => {
    const user = await Models.User.findOne({ where: { id: credentials.id } });
    if (!user) throw new CustomError('Wrong Credentials', 400);
    user.update(body);
    return user;
};

module.exports = updateUser;