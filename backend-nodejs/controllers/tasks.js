const taskModel = require('../Database/models/task')

const allTasks = async (req, res) => {
    try {
        const tasks = await taskModel.findAll()
        res.json(tasks);
    } 
    catch (error) {
        res.json(error);
    }
}

const addTask = async (req, res) => {
    try {
        const task = await taskModel.findOne({ where: { task: req.body.task }});
        if (!task) {        
            const newTask = taskModel.build(req.body);
            await newTask.save();
            res.json({...req.body, status: 'SAVED SUSCESSFULLY'});        
            return;
        }
        res.json({ status: 'Task Already Exists' });
    } 
    catch (error) {
        res.json(error);
    }
}

const getTask = async (req, res) => {
    try {
        const task = await taskModel.findOne({ where: { id: +req.params.id }});
        if (task) {
            res.json(task);
            return;
        }
        res.json({ status: 'Task not found'});
    } 
    catch (error) {
        res.json(error);
    }    
}

const updateTask = async (req, res) => {
    try {
        const foundTask = await taskModel.findOne({ where: { id: +req.params.id } });
        if (foundTask) {
            foundTask.task = req.body.task
            await foundTask.save();
            res.json({ task: foundTask.id, status: 'UPDATED SUCCESSFULLY' });
            return;
        }
        res.json({ status: 'Task not found'});
    } 
    catch (error) {
        res.json(error);
    }
}

const deleteTask = async (req, res) => {

    try {
        const task = await taskModel.findOne({ where: { id: +req.params.id }});
        if (task) {        
                await taskModel.destroy({ where: { id: +req.params.id } });        
                res.json({ task: req.params.id, status: 'REMOVED SUCCESSFULLY'});
                return;
            }    
        res.json({ status: 'Task not found'});
    } catch (error) {
        res.json(error);
    }    
}

module.exports = {
    allTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask,
}