const userModel = require('../Database/models/user');
const verifyPassword = require('../helpers/verifyPass');
const genHash = require('../helpers/genHash');
const controllerWrapper = require("../middleware/async");
const { newErrorCreator } = require('../errors/customError');
const verifyToken = require('../helpers/jwtAuth');
const jwt = require('jsonwebtoken');

const addUser = controllerWrapper(async (req, res) => {
    const user = await userModel.findOne({ where: { email: req.body.email }});
    if (user) {
        return res.json({ status: "User already exists" });
    }
    const passHash = await genHash(req.body.password);
    const newUser = userModel.build({...req.body, password: passHash});    
    await newUser.save();        
    res.json({ status: "CREATED SUSCCESSFULLY" });    
});

const loginUser = controllerWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email: email }});
    console.log(await verifyPassword(password, user.password));
    const check = user !== null ? await verifyPassword(`${password}`, `${user.password}`) : false;
    if (!check || !user) {
        return next(newErrorCreator('Wrong credentials, try again later', 403));
    }
    const { id, firstName, lastName } = user;
    const userToken = jwt.sign({ id, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ user: { firstName, lastName, email: user.email, avatar: user.avatar }, userToken }); 
});

const getUser = controllerWrapper(async (req, res, next) => {
    const token = req.headers['token'];
    const credentials = await verifyToken(token, next);
    const user = await userModel.findOne({ attributes: {exclude: ['id', 'password', 'createdAt', 'updatedAt'] }, where: {id: credentials.id } });
    console.log(user);
    if (!user) {
        return next(newErrorCreator('User not found', 404));
    }
    return res.json(user);
});

const updateUser = controllerWrapper(async (req, res, next) => {
    const token = req.headers['token'];
    const credentials = verifyToken(token, next);
    console.log(credentials);
    const user = await userModel.findOne({ where: { id: credentials.id } });
    user.update(req.body);
    res.json({ status: 'User Updated !!!'});
});

const deleteUser = controllerWrapper(async (req, res, next) => {
    const token = req.headers['token'];
    const credentials = verifyToken(token, next);
    const user = await userModel.findOne({ where: { id: credentials.id } });
    await user.destroy();
    res.json({ status: 'User Deleted !!!'});
});

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    getUser,
}