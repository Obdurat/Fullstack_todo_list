const { Sequelize } = require('sequelize');
const express = require('express');
const server = express();
const PORT = 3000;

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    username: 'root',
    password: 'password',
});

async function test() {
    try {
        await sequelize.authenticate();
        return 'DB connection established'
    } catch (e) {
        return `DB connection failed ${e}`
    }
}

// Routes

server.get('/try', (req, res) => {
    res.send('Working !!!');
})

server.listen(PORT, async () => console.log(`Back-end Running at ${PORT}, ${await test()}`));