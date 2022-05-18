const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolvers");
const db = require("./db");
require("./db/start");

const Users = require("./data-sources/user");

const { getUserId } = require("./utils");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  context: ({ req }) => {
    return {
      db,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  dataSources: () => ({
    users: new Users(db.User),
  }),
});

server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
