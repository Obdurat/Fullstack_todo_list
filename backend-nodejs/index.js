const { Sequelize } = require('sequelize');
const express = require('express');
const Routes = require('./routes/tasks');
const { append } = require('express/lib/response');
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

//Middleware

server.use(express.json());

// Routes

server.use('/api/v1/tasks', Routes)

server.listen(PORT, async () => console.log(`Back-end Running at ${PORT}, ${await test()}`));