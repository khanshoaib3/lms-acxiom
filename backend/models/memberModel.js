let mongoose = require("mongoose");

// All properties will have required set to true by default
let movie = mongoose.Schema({
});

const MovieModel = mongoose.model("Books", movie);

module.exports = MovieModel;
