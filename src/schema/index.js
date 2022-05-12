const { readFileSync } = require("fs");

const schema = readFileSync(require.resolve("./schema.graphql")).toString(
  "utf-8"
);

module.exports = schema;
