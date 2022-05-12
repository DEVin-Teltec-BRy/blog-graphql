const { users, posts } = require("../db");

const resolvers = {
  Query: {
    users: () => users,
    feed: () => posts,
  },
  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
  },
  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
  },
};

module.exports = resolvers;
