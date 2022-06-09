const taskModel = require("../Database/models/task");
const controllerWrapper = require("../middleware/async");
const verifyToken = require('../helpers/jwtAuth');
const { newErrorCreator } = require('../errors/customError');

const allTasks = controllerWrapper(async (req, res, next) => {
  const token = req.headers['token'];
  const credentials = verifyToken(token, next)  
  const tasks = await taskModel.findAll({attributes: { exclude: ['UserId'] }, where: { UserId: credentials.id } });
  res.json(tasks);
});

const addTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers['token'];
  const credentials = verifyToken(token, next);  
  const task = await taskModel.findOne({ where: { task: req.body.task, UserId: credentials.id } });
  if (task) {    
    return next(newErrorCreator('Task already exists', 400));
  }
  const newTask = taskModel.build({...req.body, UserId: credentials.id });  
  await newTask.save();
  res.status(201).json({ id: newTask.id,...req.body, status: "SAVED SUSCESSFULLY" });
});

const getTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers['token'];
  const credentials = verifyToken(token, next);
  const task = await taskModel.findOne({ attributes: { exclude: ['UserId'] }, where: { id: req.params.id, UserId: credentials.id } });
  if (!task) {
    return next(newErrorCreator("Task doesn't exists", 404));
  }
  return res.status(200).json(task);  
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers['token'];
  const credentials = verifyToken(token, next);
  const foundTask = await taskModel.findOne({ where: { id: req.params.id, UserId: credentials.id } });
  if (!foundTask) {
    return next(newErrorCreator("Task doesn't exists", 400));
  }
  foundTask.task = req.body.task;
  await foundTask.save();
  res
    .status(201)
    .json({ task: foundTask.id, status: "UPDATED SUCCESSFULLY" });
  return;
  
});

const deleteTask = controllerWrapper(async (req, res, next) => {  
  const token = req.headers['token'];
  const credentials = verifyToken(token, next)
  const task = await taskModel.findOne({ where: { id: req.params.id, UserId: credentials.id } });
  if (!task) {
    return next(newErrorCreator('Task not found', 404));
  }
  await taskModel.destroy({ where: { id: req.params.id } });
  res
    .status(201)
    .json({ task: req.params.id, status: "REMOVED SUCCESSFULLY" });
  return;  
});

module.exports = {
  allTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
