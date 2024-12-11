let mongoose = require("mongoose");

// All properties will have required set to true by default
let category = mongoose.Schema({
  code_no_from: { type: String, unique: true },
  code_no_to: String,
  name: String,
});

const cat_model = mongoose.model("Categories", category);

module.exports = cat_model;
