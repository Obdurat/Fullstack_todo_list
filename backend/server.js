const express = require('express');
const server = express();
const taskRoutes = require('./routes/tasks/routes.js');
const userRoutes = require('./routes/users/routes.js');
const DB = require('./Database/models');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.BACKEND_PORT || 3000;

// Routes

server.use(express.json());
server.use(cors({
    origin: '*'
}));
server.use(express.static('View'));
server.use('/api/v1/tasks', taskRoutes);
server.use('/api/v1/users', userRoutes);

//Middleware

server.use(errorHandler)
server.use(notFound);

//DB

const start = async () => {
    try {
        await DB.sequelize.authenticate();
        server.listen(PORT, () => console.log(`Back-end Running at ${PORT}, DB connection estabilished`));
    } catch (error) {
        console.log(error);
    }
}

start();