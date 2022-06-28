const express = require('express');
const server = express();
const taskRoutes = require('./routes/tasks/routes.js');
const userRoutes = require('./routes/users/routes.js');
const { connectDB } = require('./Database/connect.js');
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
server.use('/api/v1/tasks', taskRoutes);
server.use('/api/v1/users', userRoutes);

//Middleware

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