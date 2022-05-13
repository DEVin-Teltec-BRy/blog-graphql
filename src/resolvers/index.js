const { GraphQLScalarType, Kind } = require("graphql");
const { users, posts } = require("../db");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    user: (_, args) => users.find((user) => user.id === args.id),
    users: () => users,
    feed: () => posts,
  },
  Mutation: {
    createPost: (_, args) => {
      const post = {
        id: `post-${posts.length + 1}`,
        title: "Olá Post 1 ",
        content: args.content,
        authorId: args.userId,
        createdAt: new Date(),
      };

      posts.push(post);

      return post;
    },
  },
  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
    followers: (parent) =>
      users.filter((user) => user.followersIds.includes(parent.id)),
  },
  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
  },
};

module.exports = resolvers;
