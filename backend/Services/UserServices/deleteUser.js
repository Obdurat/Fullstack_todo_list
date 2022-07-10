const Models = require("../../Database/models/");
const { CustomError } = require('../../errors/customError');

const deleteUser = async (credentials) => {
    const user = await Models.User.findOne({ where: { id: credentials.id } });
    if (!user) throw new CustomError('Wrong Credentials', 400);
    await user.destroy();
    return;   
};

module.exports = deleteUser;

