const taskModel = require("../Database/models/task");
const controllerWrapper = require("../middleware/async");
const jwt = require('jsonwebtoken');

const allTasks = controllerWrapper(async (req, res) => {
  const something = req.headers['token'];
  const user = jwt.verify(something, 'shasha');
  console.log(user);
  const tasks = await taskModel.findAll({
      attributes: { 
        exclude: ['UserId'] 
      }},
       { where: { UserId: user.id }});  
  res.json(tasks);
});

const addTask = controllerWrapper(async (req, res) => {
  const something = req.headers['token'];
  const user = jwt.verify(something, 'shasha');
  const task = await taskModel.findOne({ where: { task: req.body.task, UserId: user.id } });
  if (task) {
    res.status(202).json({ status: "Task Already Exists" });
    return;
  }
  const newTask = taskModel.build({...req.body, UserId: user.id });
  await newTask.save();
  res.status(201).json({ id: newTask.id,...req.body, status: "SAVED SUSCESSFULLY" });
});

const getTask = controllerWrapper(async (req, res) => {
  const something = req.headers['token'];
  const user = jwt.verify(something, 'shasha');
  const task = await taskModel.findOne({ where: { id: +req.params.id, UserId: user.id } });
  if (task) {
    res.status(200).json(task);
    return;
  }
  res.status(404).json({ status: "Task not found" });
});

const updateTask = controllerWrapper(async (req, res) => {
  const something = req.headers['token'];
  const user = jwt.verify(something, 'shasha');
  const foundTask = await taskModel.findOne({ where: { id: +req.params.id, UserId: user.id } });
  if (foundTask) {
    foundTask.task = req.body.task;
    await foundTask.save();
    res
      .status(201)
      .json({ task: foundTask.id, status: "UPDATED SUCCESSFULLY" });
    return;
  }
  res.status(404).json({ status: "Task not found" });
});

const deleteTask = controllerWrapper(async (req, res) => {
  const something = req.headers['token'];
  const user = jwt.verify(something, 'shasha');
  const task = await taskModel.findOne({ where: { id: +req.params.id, UserId: user.id } });
  if (task) {
    await taskModel.destroy({ where: { id: +req.params.id } });
    res
      .status(201)
      .json({ task: req.params.id, status: "REMOVED SUCCESSFULLY" });
    return;
  }
  res.status(404).json({ status: "Task not found" });
});

module.exports = {
  allTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
