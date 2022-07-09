const express = require('express');
const Router = express.Router();

const { 
    allTasks, 
    addTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../../Controllers/tasks');

Router.route('/')
    .get(allTasks)
    .post(addTask);

Router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

module.exports = Router