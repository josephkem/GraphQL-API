const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");

//Set env variables
dotenv.config();

const app = express();

//Cors
app.use(cors());

//Body parser middleware
app.use(express.json());

const typeDefs = gql`
  type Query {
    greetings: String!
  }
`;
const resolvers = {
  Query: {},
};

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
  console.log(`Server listening on port ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});
