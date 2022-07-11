"use strict";
const uuid = require("uuid");
const users = require("./Users.json");
const tasks = require("./Tasks.json");

const usersSeed = users.map((user) => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.id = uuid.v1();
  user.avatar = `https://robohash.org/${user.firstName}${user.lastName}`;
  return user;
});

const tasksSeed = tasks.map((task) => {
  task.createdAt = new Date();
  task.updatedAt = new Date();
  task.id = uuid.v1();
  task.completed = Math.random() < 0.5 ? true : false;
  task.UserId = usersSeed[Math.floor(Math.random() * 9)].id;
  return task;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersInsert = await queryInterface.bulkInsert("Users", usersSeed, { returning: true });
    const tasksInsert = await queryInterface.bulkInsert("Tasks", tasksSeed, { returning: true });
    return ({ usersInsert, tasksInsert });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    return null;
  },
};
