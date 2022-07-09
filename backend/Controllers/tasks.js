const controllerWrapper = require("../middleware/async");
const verifyToken = require("../helpers/jwtAuth");
const TaskServices = require("../Services/TaskServices");

const allTasks = controllerWrapper(async (req, res, next) => {
  const token = req.headers["token"];
  const credentials = await verifyToken(token, next);
  const tasks = await TaskServices.allTasks(credentials);
  res.json(tasks);
});

const addTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers["token"];
  const credentials = verifyToken(token, next);
  const newTask = await TaskServices.addTask(credentials, req.body);
  res.status(201).json(newTask);
});

const getTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers["token"];
  const { id } = req.params;
  const credentials = verifyToken(token, next);
  const task = await TaskServices.singleTask(credentials, id);
  return res.status(200).json(task);
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers["token"];
  const { id } = req.params;
  const credentials = verifyToken(token, next);
  const foundTask = await TaskServices.updateTask(credentials, id, req.body);
  return res.status(201).json(foundTask);
});

const deleteTask = controllerWrapper(async (req, res, next) => {
  const token = req.headers["token"];
  const { id } = req.params;
  const credentials = verifyToken(token, next);
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
