const { CustomError } = require('../../errors/customError');
const Models = require('../../Database/models');

const allTasks = async (credentials) => {
    const tasks = await Models.Task.findAll({
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