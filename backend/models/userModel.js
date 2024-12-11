let mongoose = require("mongoose");

// All properties will have required set to true by default
let user = mongoose.Schema({
  user_id: { type: String, unique: true },
  name: String,
  password: String,
  joining: { type: Date, default: Date.now },
  is_admin: Boolean,
});

const UserModel = mongoose.model("Users", user);

module.exports = UserModel;
