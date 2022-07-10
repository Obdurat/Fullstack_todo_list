const express = require('express');
const Router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');
const usersReqValidations = require('../../middleware/Joi_Validations/User_req');

const {    
    addUser,     
    updateUser, 
    deleteUser,
    loginUser,
    getUser,
    forgotPassword,
    resetPassword,
} = require('../../Controllers/users')

Router.route('/register')    
    .post(usersReqValidations.registerValidation, addUser);

Router.route('/login')
    .post(usersReqValidations.loginValidation, loginUser);

Router.route('/profile')
    .get(jwtAuth, getUser)
    .patch(usersReqValidations.updateValidation ,jwtAuth, updateUser)
    .delete(jwtAuth, deleteUser);

Router.route('/forgotpassword')
    .post(usersReqValidations.forgotPassValidation ,forgotPassword)
    .patch(usersReqValidations.resetPassValidation ,jwtAuth, resetPassword);

module.exports = Router