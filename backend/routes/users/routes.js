const express = require('express');
const Router = express.Router();

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
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = Router