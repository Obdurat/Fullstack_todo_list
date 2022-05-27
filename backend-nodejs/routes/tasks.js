const express = require('express');
const { route } = require('express/lib/application');
const Router = express.Router();

Router.route('/').get((req, res) => {
    res.send('All items');
});

module.exports = Router