const { MongoDataSource } = require("apollo-datasource-mongodb");

class Posts extends MongoDataSource {
  getFeed() {
    return this.find();
  }
}

module.exports = Posts;
