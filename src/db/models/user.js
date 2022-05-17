const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  followersIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", UserSchema);
