const Models = require("../../Database/models/");
const { CustomError } = require('../../errors/customError');

const singleTask = async (credentials, id) => {
    const task = await Models.Task.findOne({
        attributes: {
            exclude: ['UserId'],
        },
        where: {
            id: id, UserId: credentials.id,
        },
    });
    if (!task) throw new CustomError("Task doesn't exists", 404);
    return task;
};

module.exports = singleTask;