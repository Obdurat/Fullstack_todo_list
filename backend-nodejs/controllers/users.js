const userModel = require('../Database/models/user');
const verifyPassword = require('../helpers/verifyPass');
const controllerWrapper = require("../middleware/async");
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

const loginUser = controllerWrapper(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email: email }});
    const test = verifyPassword(password, user.password);
    const check = user !== null ? verifyPassword(password, user.password) : false;
    console.log(test);
    if (!check || !user) {
        return res.json({ status: "Wrong credentials, please try again later" });
    }
    const { id, firstName, lastName } = user.dataValues;
    const userToken = jwt.sign({ id, firstName, lastName }, 'shasha', { expiresIn: '1d' });

    return res.json({ user: `${firstName} ${lastName}`, userToken }); 
});

const updateUser = controllerWrapper(async (req, res) => {
    const something = req.headers['token'];
    const credentials = jwt.verify(something, 'shasha');
    const user = await userModel.findOne({ where: { id: credentials.id } });
    const fields = Object.keys(req.body);
    if (fields.includes('id') || fields.includes('updatedAt') || fields.includes('createdAt')) return res.json({ msg: 'nope'});
    fields.forEach((field) => {
        user[field] = req.body[field];
    });
    await user.save();
    res.send('User Updated !!!');
});

const deleteUser = controllerWrapper(async (req, res) => {
    const something = req.headers['token'];
    const credentials = jwt.verify(something, 'shasha');
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