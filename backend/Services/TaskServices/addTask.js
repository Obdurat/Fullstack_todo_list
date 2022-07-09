const taskModel = require("../../Database/models/task");
const { CustomError } = require("../../errors/customError");

const addTask = async (credentials, body) => {
  const task = await taskModel.findOne({
    where: {
      task: body.task,
      UserId: credentials.id,
    },
  });
  if (task) throw new CustomError("Task already exists", 400);
  const newTask = taskModel.build({ ...body, UserId: credentials.id });
  await newTask.save();
  return ({ id: newTask.id, ...body, status: "Saved successfully"});
};

module.exports = addTask;
