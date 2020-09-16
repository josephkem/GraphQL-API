const { users, tasks } = require("../constants/index");
const User = require("../database/models/users");
const colors = require("colors");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (user) {
          throw new Error("Email already in use");
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },

  User: {
    tasks: ({ id }) => tasks.filter((task) => task.id === id),
  },
};
