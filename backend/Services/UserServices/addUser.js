const { CustomError } = require('../../errors/customError');
const genHash = require('../../helpers/genHash');
const Models = require('../../Database/models');

const addUser = async (body) => {
    const user = await Models.User.findOne({ where: { email: body.email } });
    if (user) throw new CustomError('User allready exists', 400);
    const passHash = await genHash(body.password);
    const newUser = Models.User.build({...body, password: passHash});
    await newUser.save();
    return 'Created successfully !';
};

module.exports = addUser;