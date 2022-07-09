const taskModel = require('../../Database/models/task');
const { CustomError } = require('../../errors/customError');

const singleTask = async (credentials, id) => {
    const task = await taskModel.findOne({
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