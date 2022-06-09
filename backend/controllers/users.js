const userModel = require('../Database/models/user');
const verifyPassword = require('../helpers/verifyPass');
const controllerWrapper = require("../middleware/async");
const { newErrorCreator } = require('../errors/customError');
const verifyToken = require('../helpers/jwtAuth');
const jwt = require('jsonwebtoken');

const addUser = controllerWrapper(async (req, res) => {
    const user = await userModel.findOne({ where: { email: req.body.email }});
    if (user) {
        return res.json({ status: "User already exists" });
    }
    const newUser = userModel.build(req.body);         
    await newUser.save();        
    res.json({ status: "CREATED SUSCCESSFULLY" });    
});

const loginUser = controllerWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email: email }});    
    const check = user !== null ? verifyPassword(password, user.password) : false;    
    if (!check || !user) {
        return next(newErrorCreator('Wrong credentials, try again later', 403));
    }
    const { id, firstName, lastName } = user.dataValues;
    const userToken = jwt.sign({ id, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({ user: `${firstName} ${lastName}`, userToken }); 
});

const updateUser = controllerWrapper(async (req, res, next) => {
    const token = req.headers['token'];
    const credentials = verifyToken(token, next);
    const user = await userModel.findOne({ where: { id: credentials.id } });
    const fields = Object.keys(req.body);
    if (fields.includes('id') || fields.includes('updatedAt') || fields.includes('createdAt')) return next(newErrorCreator('Bad request', 400));
    fields.forEach((field) => {
        user[field] = req.body[field];
    });
    await user.save();
    res.send('User Updated !!!');
});

const deleteUser = controllerWrapper(async (req, res, next) => {
    const token = req.headers['token'];
    const credentials = verifyToken(token, next);
    const user = await userModel.findOne({ where: { id: credentials.id } });
    await user.destroy();
    res.send('User Deleted !!!');
});

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    loginUser,
}