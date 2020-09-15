const uuid = require("uuid");
const { users, tasks } = require("../constants/index");

module.exports = {
  Query: {
    tasks: () => {
      console.log(tasks);
      return tasks;
    },
    task: (_, { id }) => tasks.find((task) => task.id === id),
  },

  Mutation: {
    createTask: (_, { input }) => {
      const task = { ...input, id: uuid.v4() };
      tasks.push(task);
      return task;
    },
  },

  Task: {
    user: ({ userId }) => {
      console.log("userId", userId);
      return users.find((user) => user.id === userId);
    },
  },
};
