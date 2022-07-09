const taskModel = require('../../Database/models/task');
const { CustomError } = require('../../errors/customError');

const allTasks = async (credentials) => {
    const tasks = await taskModel.findAll({
        attributes: {
            exclude: ['UserId']
        },
        where: {
            UserId: credentials.id
        }
    });
    if(!tasks) throw new CustomError('No Tasks available', 404);
    return tasks;
};

module.exports = allTasks;