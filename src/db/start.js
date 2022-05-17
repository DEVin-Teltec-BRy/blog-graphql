const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.DB_URL, process.env.DB_NAME);

mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`);

const db = mongoose.connection;

db.on("Error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connect to mongodb");
});
