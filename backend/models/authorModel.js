let mongoose = require("mongoose");

// All properties will have required set to true by default
let author = mongoose.Schema({
  name: { type: String, unique: true },
});

const AuthorModel = mongoose.model("Authors", author);

module.exports = AuthorModel;
