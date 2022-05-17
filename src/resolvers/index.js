const { DateScalar } = require("./scalar");

const resolvers = {
  Date: DateScalar,
  Query: {
    user: async (_, { id }, { db: { User } }) => User.findById(id),
    users: async (_, __, { db: { User } }) => User.find(),
    feed: async (parent, args, { db: { Post } }) => Post.find(),
  },
  Mutation: {
    createUser: (_, { user }, { db: { User } }) => {
      return User.create(user);
    },
    createPost: async (_, { post }, { db: { Post } }) => {
      await Post.create(post);

      return post;
    },
    updateUser: (_, { user }, { users }) => {
      const foundUserIndex = users.findIndex((u) => u.id === user.id);
      users[foundUserIndex] = user;

      return user;
    },
  },
  User: {
    posts: (parent, args, { posts }) =>
      posts.filter((post) => post.authorId === parent.id),
    followers: (parent, args, { users }) =>
      users.filter((user) => user.followersIds.includes(parent.id)),
  },
  Post: {
    author: (parent, args, { users }) =>
      users.find((user) => user.id === parent.authorId),
  },
};

module.exports = resolvers;
