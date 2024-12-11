let mongoose = require("mongoose");

// All properties will have required set to true by default
let book = mongoose.Schema({
  s_no: { type: String, unique: true },
  name: String,
  author: String,
  count: Number,
  cost: Number,
  proc_date: Date,
});

const BookModel = mongoose.model("Books", book);

module.exports = BookModel;
