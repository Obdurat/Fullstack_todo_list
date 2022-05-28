const taskModel = require('../Database/models/task')

const allTasks = async (req, res) => {
    try {
        const tasks = await taskModel.findAll()
        res.status(200).json(tasks);
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
            res.status(201).json({...req.body, status: 'SAVED SUSCESSFULLY'});        
            return;
        }
        res.status(202).json({ status: 'Task Already Exists' });
    } 
    catch (error) {
        res.status(408).json(error);
    }
}

const getTask = async (req, res) => {
    try {
        const task = await taskModel.findOne({ where: { id: +req.params.id }});
        if (task) {
            res.status(200).json(task);
            return;
        }
        res.status(202).json({ status: 'Task not found'});
    } 
    catch (error) {
        res.status(408).json(error);
    }    
}

const updateTask = async (req, res) => {
    try {
        const foundTask = await taskModel.findOne({ where: { id: +req.params.id } });
        if (foundTask) {
            foundTask.task = req.body.task
            await foundTask.save();
            res.status(201).json({ task: foundTask.id, status: 'UPDATED SUCCESSFULLY' });
            return;
        }
        res.status(202).json({ status: 'Task not found'});
    } 
    catch (error) {
        res.status(408).json(error);
    }
}

const deleteTask = async (req, res) => {

    try {
        const task = await taskModel.findOne({ where: { id: +req.params.id }});
        if (task) {        
                await taskModel.destroy({ where: { id: +req.params.id } });        
                res.status(201).json({ task: req.params.id, status: 'REMOVED SUCCESSFULLY'});
                return;
            }    
        res.status(202).json({ status: 'Task not found'});
    } catch (error) {
        res.status(408).json(error);
    }    
}

module.exports = {
    allTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask,
}