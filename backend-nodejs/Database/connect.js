const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    username: 'root',
    password: 'password',
    database: 'todo_db',
});

const connectDB = async () => {
    await sequelize.authenticate();    
}

module.exports = {connectDB, sequelize};