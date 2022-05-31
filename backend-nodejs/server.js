const express = require('express');
const server = express();
const taskRoutes = require('./routes/tasks/routes.js');
const userRoutes = require('./routes/users/routes.js');
const { connectDB } = require('./Database/connect.js');
const notFound = require('./middleware/notFound');
const errorHandler = require('./helpers/errorHandler');
require('dotenv').config()

const PORT = 3000;

//Middleware

server.use(express.json());

// Routes

server.use('/api/v1/tasks', taskRoutes);
server.use('/api/v1/users', userRoutes);
server.use(notFound);
server.use(errorHandler)

//DB

const start = async () => {
    try {
        await connectDB()
        server.listen(PORT, async () => console.log(`Back-end Running at ${PORT}, DB connection estabilished`));
    } catch (error) {
        console.log(error);
    }
}

start();