const Models = require("../../Database/models/");
const { CustomError } = require("../../errors/customError");

const updateTask = async (credentials, id, body) => {
  const foundTask = await Models.Task.findOne({
    where: {
      id: id,
      UserId: credentials.id,
    },
  });
  if (!foundTask) throw new CustomError("Task doesn't exists", 400);
  await foundTask.update(body);
  await foundTask.save();
  return ({ id: foundTask.id, status: "Updated successfully" });
};

module.exports = updateTask;
