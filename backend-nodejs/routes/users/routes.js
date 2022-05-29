const express = require('express');
const Router = express.Router();

const {    
    addUser,     
    updateUser, 
    deleteUser 
} = require('../../controllers/users')

Router.route('/')    
    .post(addUser);

Router.route('/:id')    
    .patch(updateUser)
    .delete(deleteUser);

module.exports = Router