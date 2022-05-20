const { ApolloServer, PubSub } = require("apollo-server");
const schema = require("./schema");
const db = require("./db");
const resolvers = require("./resolvers");
require("./db/start");
const Users = require("./data-sources/user");

const { getUserId } = require("./utils");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  subscriptions: {
    path: "/subscriptions",
  },
  context: ({ req }) => {
    return {
      db,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  dataSources: () => ({
    users: new Users(db.User),
  }),
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
