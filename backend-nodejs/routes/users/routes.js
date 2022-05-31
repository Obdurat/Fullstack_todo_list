const express = require('express');
const Router = express.Router();

const {    
    addUser,     
    updateUser, 
    deleteUser,
    loginUser
} = require('../../controllers/users')

Router.route('/register')    
    .post(addUser);

Router.route('/login')
    .post(loginUser);

Router.route('/profile')    
    .patch(updateUser)
    .delete(deleteUser);

module.exports = Router