const { users, tasks } = require("../constants/index");
const User = require("../database/models/users");
const colors = require("colors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }, { email }) => {
      console.log("===", email);
      users.find((user) => user.id === id);
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (user) {
          throw new Error("Email already in use".red.inverse);
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });

        if (!user) {
          throw new Error("User not found".brightRed);
        }

        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect Password".brightRed);
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: 360000,
        });
        return { token };
      } catch (err) {
        console.log(err);
      }
    },
  },

  User: {
    tasks: ({ id }) => tasks.filter((task) => task.id === id),
  },
};
