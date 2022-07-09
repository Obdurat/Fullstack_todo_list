const userModel = require('../../Database/models/user');
const { CustomError } = require('../../errors/customError');

const deleteUser = async (credentials) => {
    const user = await userModel.findOne({ where: { id: credentials.id } });
    if (!user) throw new CustomError('Wrong Credentials', 400);
    await user.destroy();
    return;   
};

module.exports = deleteUser;

