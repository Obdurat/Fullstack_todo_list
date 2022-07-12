require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT_BINDING,
    "database": "todo_list",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}


