let mongoose = require("mongoose");

// All properties will have required set to true by default
let movie = mongoose.Schema({
  s_no: { type: Number, unique: true },
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authors"
  },
  status: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories"
  },
  cost: Number,
  proc_date: Date,
});

const MovieModel = mongoose.model("Books", movie);

module.exports = MovieModel;
