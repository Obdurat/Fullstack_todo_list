const express = require('express');
const Router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');

const { 
    allTasks, 
    addTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../../Controllers/tasks');

Router.route('/')
    .get(jwtAuth, allTasks)
    .post(jwtAuth, addTask);

Router.route('/:id')
    .get(jwtAuth, getTask)
    .patch(jwtAuth, updateTask)
    .delete(jwtAuth, deleteTask);

module.exports = Router