const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolvers");
const db = require("./db");
require("./db/start");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    db,
  },
});

server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
