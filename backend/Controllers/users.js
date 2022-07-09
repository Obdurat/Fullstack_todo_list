const controllerWrapper = require("../middleware/async");
const jwt = require('jsonwebtoken');
const UserServices = require('../Services/UserServices');

const addUser = controllerWrapper(async (req, res) => {
    const newUser = await UserServices.addUser(req.body);
    return res.status(200).json({ status: newUser });
});

const loginUser = controllerWrapper(async (req, res) => {
    const user = await UserServices.login(req.body);
    const { id, firstName, lastName, email, avatar } = user;
    const userToken = jwt.sign({ id, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ user: { firstName, lastName, email, avatar }, userToken }); 
});

const getUser = controllerWrapper(async (req, res, next) => {
    const credentials = req.credentials;
    const user = await UserServices.getUser(credentials);
    return res.json(user);
});

const updateUser = controllerWrapper(async (req, res, next) => {
    const credentials = req.credentials;
    await UserServices.updateUser(credentials, req.body);
    res.json({ status: 'User Updated !!!'});
});

const deleteUser = controllerWrapper(async (req, res, next) => {
    const credentials = req.credentials;
    await UserServices.deleteUser(credentials);
    res.json({ status: 'User Deleted !!!'});
});

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    getUser,
}