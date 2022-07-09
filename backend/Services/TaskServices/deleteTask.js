const taskModel = require("../../Database/models/task");
const { CustomError } = require("../../errors/customError");

const deleteTask = async (credentials, id) => {
  const task = await taskModel.findOne({
    where: { id: id, UserId: credentials.id },
  });
  if (!task) throw new CustomError("Task not found", 404);
  await task.destroy();
  return "Removed Successfully";
};

module.exports = deleteTask;
