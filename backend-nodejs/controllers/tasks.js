const taskModel = require("../Database/models/task");
const controllerWrapper = require("../middleware/async");

const allTasks = controllerWrapper(async (req, res) => {
  const tasks = await taskModel.findAll();
  res.status(200).json(tasks);
});

const addTask = controllerWrapper(async (req, res) => {
  const task = await taskModel.findOne({ where: { task: req.body.task } });
  if (task) {
    res.status(202).json({ status: "Task Already Exists" });
    return;
  }
  const newTask = taskModel.build(req.body);
  await newTask.save();
  res.status(201).json({ id: newTask.id,...req.body, status: "SAVED SUSCESSFULLY" });
});

const getTask = controllerWrapper(async (req, res) => {
  const task = await taskModel.findOne({ where: { id: +req.params.id } });
  if (task) {
    res.status(200).json(task);
    return;
  }
  res.status(404).json({ status: "Task not found" });
});

const updateTask = controllerWrapper(async (req, res) => {
  const foundTask = await taskModel.findOne({ where: { id: +req.params.id } });
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
  const task = await taskModel.findOne({ where: { id: +req.params.id } });
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
