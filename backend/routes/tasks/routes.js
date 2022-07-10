const express = require('express');
const Router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');
const tasksReqValidations = require('../../middleware/Joi_Validations/Tasks_req');

const { 
    allTasks, 
    addTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../../Controllers/tasks');

Router.route('/')
    .get(jwtAuth, allTasks)
    .post(tasksReqValidations.addTaskValidation ,jwtAuth, addTask);

Router.route('/:id')
    .get(jwtAuth, getTask)
    .patch(tasksReqValidations.updateTaskValidation ,jwtAuth, updateTask)
    .delete(jwtAuth, deleteTask);

module.exports = Router