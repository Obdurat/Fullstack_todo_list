const Models = require("../../Database/models/");
const jwt = require('jsonwebtoken');
const { CustomError } = require('../../errors/customError');
const { promiseSendMail } = require('../../helpers/nodemailer');

const forgotPassword = async (body) => {
    const { email } = body;
    const { id, firstName, lastName } = await Models.User.findOne({ where : { email: email }});
    if (!id) throw new CustomError("User doesn't exist", 404);
    const userToken = jwt.sign({ id, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return promiseSendMail(userToken, email);
};

module.exports = forgotPassword;