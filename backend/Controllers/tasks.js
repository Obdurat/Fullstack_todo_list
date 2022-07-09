const controllerWrapper = require("../middleware/async");
const TaskServices = require("../Services/TaskServices");

const allTasks = controllerWrapper(async (req, res, next) => {
  const credentials = req.credentials;
  const tasks = await TaskServices.allTasks(credentials);
  res.json(tasks);
});

const addTask = controllerWrapper(async (req, res, next) => {
  const credentials = req.credentials;
  const newTask = await TaskServices.addTask(credentials, req.body);
  res.status(201).json(newTask);
});

const getTask = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const credentials = req.credentials;
  const task = await TaskServices.singleTask(credentials, id);
  return res.status(200).json(task);
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const credentials = req.credentials;
  const foundTask = await TaskServices.updateTask(credentials, id, req.body);
  return res.status(201).json(foundTask);
});

const deleteTask = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const credentials = req.credentials;
  const status = await TaskServices.deleteTask(credentials, id);
  return res.status(201).json({ task: req.params.id, status });
});

module.exports = {
  allTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
