const Models = require("../../Database/models/");
const { CustomError } = require('../../errors/customError');
const genHash = require('../../helpers/genHash');

const resetpassword = async (credentials, body) => {
    const user = await Models.User.findOne({ where: { id: credentials.id }});
    if (!user) throw new CustomError('Wrong Credentials', 400);
    const hash = await genHash(body.password);
    await user.update({ password: hash });
    await user.save();
    return ({ status: "Password reset successfully"});
};

module.exports = resetpassword;