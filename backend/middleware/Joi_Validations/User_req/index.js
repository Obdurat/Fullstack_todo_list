const forgotPassValidation = require('./ForgotPasswordRequest');
const loginValidation = require('./LoginRequest');
const resetPassValidation = require('./ResetPasswordRequest');
const updateValidation = require('./UpdateRequest');
const registerValidation = require('./RegisterRequest');

module.exports = {
    forgotPassValidation,
    loginValidation,
    registerValidation,
    updateValidation,
    resetPassValidation,
};