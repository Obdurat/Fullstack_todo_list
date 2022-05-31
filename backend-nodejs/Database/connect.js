const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    port: process.env.PORT_BINDING,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'todo_db',
});

const connectDB = async () => {
    await sequelize.authenticate();    
}

module.exports = {connectDB, sequelize};