module.exports = {
  users: [
    {
      id: "122",
      name: "Mary",
      followersIds: ["123", "124"],
    },
    {
      id: "123",
      name: "John",
      followersIds: ["122", "124"],
    },
    {
      id: "124",
      name: "Peter",
      followersIds: ["123", "122"],
    },
  ],
  posts: [
    {
      id: "11111",
      title: "Olá Post 1 ",
      content: "Este foi meu primeiro post",
      authorId: "122",
    },
    {
      id: "22222",
      title: "Olá Post 2 ",
      content: "Este foi meu segundo post",
      authorId: "123",
    },
    {
      id: "33333",
      title: "Olá Post 3",
      content: "Este foi meu terceiro post",
      authorId: "124",
    },
    {
      id: "44444",
      title: "Olá Post 4",
      content: "Este foi meu quarto post",
      authorId: "122",
    },
  ],
};
