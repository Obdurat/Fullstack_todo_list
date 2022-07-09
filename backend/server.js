const express = require('express');
const server = express();
const taskRoutes = require('./routes/tasks/routes.js');
const userRoutes = require('./routes/users/routes.js');
const { connectDB } = require('./Database/connect.js');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();
const userModel = require('./Database/models/user');
const taskModel = require('./Database/models/task');

const PORT = process.env.BACKEND_PORT || 3000;


// Routes

server.use(express.json());
server.use(cors({
    origin: '*'
}));
server.use('/api/v1/tasks', taskRoutes);
server.use('/api/v1/users', userRoutes);

//Middleware

server.use(errorHandler)
server.use(notFound);

//DB

const start = async () => {
    try {
        await connectDB()
        await userModel.sync();
        await taskModel.sync();
        server.listen(PORT, () => console.log(`Back-end Running at ${PORT}, DB connection estabilished`));
    } catch (error) {
        console.log(error);
    }
}

start();