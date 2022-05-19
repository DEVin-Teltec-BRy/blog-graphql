const bcrypt = require("bcryptjs/dist/bcrypt");
const { DateScalar } = require("./scalar");

const jwt = require("jsonwebtoken");

const resolvers = {
  Date: DateScalar,
  Query: {
    user: async (_, { id }, { dataSources: { users } }) => users.getUser(id),
    users: async (_, __, { dataSources: { users } }) => users.getAll(),
    feed: async (parent, args, { db: { Post } }) => Post.find(),
  },
  Mutation: {
    createUser: async (parent, { user }, { dataSources: { users } }) => {
      const password = await bcrypt.hash(user.password, 10);
      console.log({ user });
      const userCreated = await users.create({ ...user, password });
      console.log({ userCreated });
      const token = jwt.sign(
        { userId: userCreated.id },
        process.env.APP_SECRET,
        { expiresIn: "15m" }
      );

      return {
        token,
        user: userCreated,
      };
    },
    login: async (
      parent,
      { email, password },
      { dataSources: { users } },
      info
    ) => {
      const [user] = await users.findByEmail(email);
      console.log({ user });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Senha inválida");
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: "15m",
      });

      return {
        token,
        user,
      };
    },
    createPost: async (_, { post }, { db: { Post }, userId }) => {
      if (!userId) {
        throw new Error("Usuário não identificado");
      }
      console.log({ userId });
      try {
        await Post.create({ ...post, author: userId });
      } catch (error) {
        console.log({ error });
        throw new Error("Erro ao criar post.");
      }

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
