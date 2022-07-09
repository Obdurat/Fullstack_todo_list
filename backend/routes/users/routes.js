const express = require('express');
const Router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');

const {    
    addUser,     
    updateUser, 
    deleteUser,
    loginUser,
    getUser
} = require('../../Controllers/users')

Router.route('/register')    
    .post(addUser);

Router.route('/login')
    .post(loginUser);

Router.route('/profile')
    .get(jwtAuth, getUser)
    .patch(jwtAuth, updateUser)
    .delete(jwtAuth, deleteUser);

module.exports = Router