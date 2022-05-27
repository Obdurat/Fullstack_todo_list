const allTasks = (req, res) => {
    res.send('get: Get all tasks !!!');
}

const addTask = (req, res) => {
    res.send('post: Create a new Task !!!');
}

const getTask = (req, res) => {
    res.send('get/id: Get a single task by id');
}

const updateTask = (req, res) => {
    res.send('patch/id: Updates a task');
}

const deleteTask = (req, res) => {
    res.send('delete/id: deletes a task');
}

module.exports = {
    allTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask,
}