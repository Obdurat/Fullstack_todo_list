const userModel = require('../../Database/models/user')
const { CustomError } = require('../../errors/customError');
const genHash = require('../../helpers/genHash');

const addUser = async (body) => {
    const user = await userModel.findOne({ where: { email: body.email } });
    if (user) throw new CustomError('User allready exists', 400);
    const passHash = await genHash(body.password);
    const newUser = userModel.build({...body, password: passHash});
    await newUser.save();
    return 'Created successfully !';
};

module.exports = addUser;