const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./database/utils");

const resolvers = require("./resolvers/index");
const typeDefs = require("./typeDefs/index");

const { tasks, users } = require("./constants/index");

//Set env variables
dotenv.config();

const app = express();

//Database connection
connection();

//Cors
app.use(cors());

//Body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 3000;

//Root path
app.use("/", (req, res, next) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`.yellow.bold);
});
