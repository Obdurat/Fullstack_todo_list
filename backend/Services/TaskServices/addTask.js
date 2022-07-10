const { CustomError } = require("../../errors/customError");
const Models = require("../../Database/models");

const addTask = async (credentials, body) => {
  const task = await Models.Task.findOne({
    where: {
      task: body.task,
      UserId: credentials.id,
    },
  });
  if (task) throw new CustomError("Task already exists", 400);
  const newTask = Models.Task.build({ ...body, UserId: credentials.id });
  await newTask.save();
  return ({ id: newTask.id, ...body, status: "Saved successfully"});
};

module.exports = addTask;
