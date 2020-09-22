const uuid = require("uuid");
const { users, tasks } = require("../constants/index");
const Task = require("../database/models/tasks");
const User = require("../database/models/users");
const { isAuthenticated } = require("./middleware/index");
const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Query: {
    tasks: () => {
      console.log(tasks);
      return tasks;
    },
    task: (_, { id }) => tasks.find((task) => task.id === id),
  },

  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        try {
          const user = await User.findOne({ email });
          const task = new Task({ ...input, user: user.id });
          const result = await task.save();
          user.tasks.push(result.id);
          await user.save();
          return result;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },

  Task: {
    user: ({ userId }) => {
      console.log("userId", userId);
      return users.find((user) => user.id === userId);
    },
  },
};
